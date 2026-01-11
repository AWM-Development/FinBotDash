import { describe, it, expect } from 'vitest';
import {
	validateSignal,
	createSignal,
	getTopAllocations,
	getTotalAllocationWeight,
	type Signal,
} from '../../../Entities/Signal';
import { type Regime } from '../../../Entities/Regime';

describe('Signal', () => {
	const validRegime: Regime = {
		date: '2026-01-11',
		strategy_id: 'test-strategy',
		regime_label: 'TRENDING_RISK_ON',
		confidence: 0.85,
	};

	describe('validateSignal', () => {
		it('should validate a valid signal', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.333, QQQ: 0.333, SHY: 0.334 },
			};

			expect(validateSignal(signal)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateSignal(null)).toBe(false);
			expect(validateSignal(undefined)).toBe(false);
			expect(validateSignal('string')).toBe(false);
			expect(validateSignal(123)).toBe(false);
		});

		it('should reject missing date', () => {
			const signal = {
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.333 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject missing strategy_id', () => {
			const signal = {
				date: '2026-01-11',
				regime: validRegime,
				target_allocations: { SPY: 0.333 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject missing regime', () => {
			const signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				target_allocations: { SPY: 0.333 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject invalid regime', () => {
			const signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: { invalid: 'regime' },
				target_allocations: { SPY: 0.333 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject missing target_allocations', () => {
			const signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject invalid allocation weight (> 1)', () => {
			const signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 1.5 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should reject invalid allocation weight (< 0)', () => {
			const signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: -0.1 },
			};

			expect(validateSignal(signal)).toBe(false);
		});

		it('should validate with optional trade_package_id', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.5, QQQ: 0.5 },
				trade_package_id: 'package-123',
			};

			expect(validateSignal(signal)).toBe(true);
		});
	});

	describe('createSignal', () => {
		it('should create a valid signal with required fields', () => {
			const allocations = { SPY: 0.333, QQQ: 0.333, SHY: 0.334 };
			const signal = createSignal('2026-01-11', 'test-strategy', validRegime, allocations);

			expect(validateSignal(signal)).toBe(true);
			expect(signal.date).toBe('2026-01-11');
			expect(signal.strategy_id).toBe('test-strategy');
			expect(signal.regime).toEqual(validRegime);
			expect(signal.target_allocations).toEqual(allocations);
		});

		it('should create signal with optional trade_package_id', () => {
			const allocations = { SPY: 0.5, QQQ: 0.5 };
			const signal = createSignal('2026-01-11', 'test-strategy', validRegime, allocations, {
				trade_package_id: 'package-123',
			});

			expect(signal.trade_package_id).toBe('package-123');
		});

		it('should throw error for invalid allocation', () => {
			expect(() => {
				createSignal('2026-01-11', 'test-strategy', validRegime, { SPY: 1.5 });
			}).toThrow('Invalid Signal data');
		});
	});

	describe('getTopAllocations', () => {
		it('should return top 3 allocations by default', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.4, QQQ: 0.3, IWM: 0.2, TLT: 0.1 },
			};

			const top = getTopAllocations(signal);

			expect(top).toHaveLength(3);
			expect(top[0]).toEqual({ symbol: 'SPY', weight: 0.4 });
			expect(top[1]).toEqual({ symbol: 'QQQ', weight: 0.3 });
			expect(top[2]).toEqual({ symbol: 'IWM', weight: 0.2 });
		});

		it('should return specified count', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.4, QQQ: 0.3, IWM: 0.2, TLT: 0.1 },
			};

			const top = getTopAllocations(signal, 2);

			expect(top).toHaveLength(2);
			expect(top[0]).toEqual({ symbol: 'SPY', weight: 0.4 });
			expect(top[1]).toEqual({ symbol: 'QQQ', weight: 0.3 });
		});

		it('should handle fewer allocations than requested', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.6, QQQ: 0.4 },
			};

			const top = getTopAllocations(signal, 5);

			expect(top).toHaveLength(2);
		});
	});

	describe('getTotalAllocationWeight', () => {
		it('should calculate total weight', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: { SPY: 0.333, QQQ: 0.333, SHY: 0.334 },
			};

			expect(getTotalAllocationWeight(signal)).toBeCloseTo(1.0, 3);
		});

		it('should handle empty allocations', () => {
			const signal: Signal = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime: validRegime,
				target_allocations: {},
			};

			expect(getTotalAllocationWeight(signal)).toBe(0);
		});
	});
});
