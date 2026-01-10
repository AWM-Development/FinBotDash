import { describe, it, expect } from 'vitest';
import {
	validateStrategy,
	createStrategy,
	isStrategyLocked,
	canEditStrategy,
	getDefaultStrategySettings,
	type Strategy,
	type StrategyStatus,
	type StrategySettings,
} from '../../../Entities/Strategy';

describe('Strategy', () => {
	describe('validateStrategy', () => {
		it('should validate a valid strategy', () => {
			const strategy: Strategy = {
				name: 'Baseline v1',
			};

			expect(validateStrategy(strategy)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateStrategy(null)).toBe(false);
			expect(validateStrategy(undefined)).toBe(false);
			expect(validateStrategy('string')).toBe(false);
			expect(validateStrategy(123)).toBe(false);
		});

		it('should reject missing name', () => {
			const strategy = {
				status: 'active',
			};

			expect(validateStrategy(strategy)).toBe(false);
		});

		it('should reject invalid status', () => {
			const strategy = {
				name: 'Test Strategy',
				status: 'invalid_status' as StrategyStatus,
			};

			expect(validateStrategy(strategy)).toBe(false);
		});

		it('should validate all valid statuses', () => {
			const validStatuses: StrategyStatus[] = ['active', 'paper', 'archived'];

			validStatuses.forEach((status) => {
				const strategy: Strategy = {
					name: 'Test Strategy',
					status,
				};

				expect(validateStrategy(strategy)).toBe(true);
			});
		});

		it('should validate optional fields', () => {
			const strategy: Strategy = {
				name: 'Test Strategy',
				version: '1.0.0',
				description: 'Test description',
				is_baseline: false,
				status: 'active',
				settings: {
					momentum_weights: {
						three_month: 33.33,
						six_month: 33.33,
						twelve_month: 33.33,
					},
				},
			};

			expect(validateStrategy(strategy)).toBe(true);
		});

		it('should reject invalid version type', () => {
			const strategy = {
				name: 'Test Strategy',
				version: 123, // should be string
			};

			expect(validateStrategy(strategy)).toBe(false);
		});

		it('should reject invalid description type', () => {
			const strategy = {
				name: 'Test Strategy',
				description: 123, // should be string
			};

			expect(validateStrategy(strategy)).toBe(false);
		});

		it('should reject invalid is_baseline type', () => {
			const strategy = {
				name: 'Test Strategy',
				is_baseline: 'true', // should be boolean
			};

			expect(validateStrategy(strategy)).toBe(false);
		});

		it('should reject invalid settings type', () => {
			const strategy = {
				name: 'Test Strategy',
				settings: 'not an object',
			};

			expect(validateStrategy(strategy)).toBe(false);
		});
	});

	describe('createStrategy', () => {
		it('should create a valid strategy with required fields', () => {
			const strategy = createStrategy('Test Strategy');

			expect(validateStrategy(strategy)).toBe(true);
			expect(strategy.name).toBe('Test Strategy');
			expect(strategy.status).toBe('active');
			expect(strategy.is_baseline).toBe(false);
			expect(strategy.created_at).toBeDefined();
			expect(strategy.updated_at).toBeDefined();
		});

		it('should create strategy with optional fields', () => {
			const settings: StrategySettings = {
				momentum_weights: {
					three_month: 33.33,
					six_month: 33.33,
					twelve_month: 33.33,
				},
				selection_count: 3,
			};

			const strategy = createStrategy('Baseline v1', {
				version: '1.0.0',
				description: 'Baseline strategy',
				is_baseline: true,
				status: 'active',
				settings,
			});

			expect(strategy.version).toBe('1.0.0');
			expect(strategy.description).toBe('Baseline strategy');
			expect(strategy.is_baseline).toBe(true);
			expect(strategy.status).toBe('active');
			expect(strategy.settings).toEqual(settings);
		});
	});

	describe('isStrategyLocked', () => {
		it('should return true for baseline strategies', () => {
			const strategy: Strategy = {
				name: 'Baseline v1',
				is_baseline: true,
			};

			expect(isStrategyLocked(strategy)).toBe(true);
		});

		it('should return false for non-baseline strategies', () => {
			const strategy: Strategy = {
				name: 'Test Strategy',
				is_baseline: false,
			};

			expect(isStrategyLocked(strategy)).toBe(false);
		});

		it('should return false when is_baseline is undefined', () => {
			const strategy: Strategy = {
				name: 'Test Strategy',
			};

			expect(isStrategyLocked(strategy)).toBe(false);
		});
	});

	describe('canEditStrategy', () => {
		it('should return false for locked (baseline) strategies', () => {
			const strategy: Strategy = {
				name: 'Baseline v1',
				is_baseline: true,
			};

			expect(canEditStrategy(strategy)).toBe(false);
		});

		it('should return false for archived strategies', () => {
			const strategy: Strategy = {
				name: 'Test Strategy',
				is_baseline: false,
				status: 'archived',
			};

			expect(canEditStrategy(strategy)).toBe(false);
		});

		it('should return true for editable strategies', () => {
			const strategy: Strategy = {
				name: 'Test Strategy',
				is_baseline: false,
				status: 'active',
			};

			expect(canEditStrategy(strategy)).toBe(true);
		});

		it('should return true for paper strategies', () => {
			const strategy: Strategy = {
				name: 'Paper Trading',
				is_baseline: false,
				status: 'paper',
			};

			expect(canEditStrategy(strategy)).toBe(true);
		});
	});

	describe('getDefaultStrategySettings', () => {
		it('should return default strategy settings', () => {
			const settings = getDefaultStrategySettings();

			expect(settings.momentum_weights).toBeDefined();
			expect(settings.momentum_weights?.three_month).toBe(33.33);
			expect(settings.momentum_weights?.six_month).toBe(33.33);
			expect(settings.momentum_weights?.twelve_month).toBe(33.33);
			expect(settings.trend_filter?.enabled).toBe(true);
			expect(settings.trend_filter?.sma_period).toBe(200);
			expect(settings.selection_count).toBe(3);
			expect(settings.equal_weight).toBe(true);
			expect(settings.volatility_targeting?.enabled).toBe(false);
			expect(settings.volatility_targeting?.target_volatility).toBe(15);
			expect(settings.risk_free_rate).toBe(4.5);
			expect(settings.rebalance_day).toBe(1);
		});

		it('should return a new object each time', () => {
			const settings1 = getDefaultStrategySettings();
			const settings2 = getDefaultStrategySettings();

			expect(settings1).not.toBe(settings2);
			expect(settings1).toEqual(settings2);
		});
	});
});
