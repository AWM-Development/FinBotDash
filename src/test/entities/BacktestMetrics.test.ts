import { describe, it, expect } from 'vitest';
import {
	validateBacktestMetrics,
	validateBacktestArtifacts,
	calculateProfit,
	formatReturn,
	getBacktestDurationDays,
	type BacktestMetrics,
	type BacktestArtifacts,
} from '../../../Entities/BacktestMetrics';

describe('BacktestMetrics', () => {
	const validMetrics: BacktestMetrics = {
		run_id: 'run-123',
		strategy_id: 'strategy-456',
		start_date: '2015-01-01',
		end_date: '2025-12-31',
		cagr: 0.087,
		total_return: 1.12,
		volatility: 0.152,
		sharpe_ratio: 0.57,
		sortino_ratio: 0.83,
		max_drawdown: -0.283,
		max_drawdown_duration_days: 456,
		final_value: 212000,
		initial_value: 100000,
	};

	describe('validateBacktestMetrics', () => {
		it('should validate valid metrics', () => {
			expect(validateBacktestMetrics(validMetrics)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateBacktestMetrics(null)).toBe(false);
			expect(validateBacktestMetrics(undefined)).toBe(false);
			expect(validateBacktestMetrics('string')).toBe(false);
			expect(validateBacktestMetrics(123)).toBe(false);
		});

		it('should reject missing run_id', () => {
			const metrics = { ...validMetrics };
			delete (metrics as Partial<BacktestMetrics>).run_id;
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject missing strategy_id', () => {
			const metrics = { ...validMetrics };
			delete (metrics as Partial<BacktestMetrics>).strategy_id;
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject missing start_date', () => {
			const metrics = { ...validMetrics };
			delete (metrics as Partial<BacktestMetrics>).start_date;
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject missing end_date', () => {
			const metrics = { ...validMetrics };
			delete (metrics as Partial<BacktestMetrics>).end_date;
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject missing cagr', () => {
			const metrics = { ...validMetrics };
			delete (metrics as Partial<BacktestMetrics>).cagr;
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject negative initial_value', () => {
			const metrics = { ...validMetrics, initial_value: -100 };
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should reject negative final_value', () => {
			const metrics = { ...validMetrics, final_value: -100 };
			expect(validateBacktestMetrics(metrics)).toBe(false);
		});

		it('should accept null sharpe_ratio', () => {
			const metrics = { ...validMetrics, sharpe_ratio: null };
			expect(validateBacktestMetrics(metrics)).toBe(true);
		});

		it('should accept optional dates', () => {
			const metrics: BacktestMetrics = {
				...validMetrics,
				peak_date: '2024-01-15',
				trough_date: '2024-03-20',
				recovery_date: '2024-06-01',
			};
			expect(validateBacktestMetrics(metrics)).toBe(true);
		});
	});

	describe('validateBacktestArtifacts', () => {
		const validArtifacts: BacktestArtifacts = {
			equity_curve: [
				{ date: '2015-01-05', value: 100000 },
				{ date: '2015-02-02', value: 101234.56 },
			],
			trades: [
				{ date: '2015-01-05', symbol: 'SPY', action: 'BUY', shares: 200, price: 200, amount: 40000 },
			],
			events: [
				{ date: '2015-01-05', allocations: { SPY: 0.5, QQQ: 0.5 } },
			],
		};

		it('should validate valid artifacts', () => {
			expect(validateBacktestArtifacts(validArtifacts)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateBacktestArtifacts(null)).toBe(false);
			expect(validateBacktestArtifacts(undefined)).toBe(false);
		});

		it('should reject missing equity_curve', () => {
			const artifacts = { ...validArtifacts };
			delete (artifacts as Partial<BacktestArtifacts>).equity_curve;
			expect(validateBacktestArtifacts(artifacts)).toBe(false);
		});

		it('should reject invalid equity_curve entry', () => {
			const artifacts = {
				...validArtifacts,
				equity_curve: [{ invalid: 'entry' }],
			};
			expect(validateBacktestArtifacts(artifacts)).toBe(false);
		});

		it('should reject trade with invalid action', () => {
			const artifacts = {
				...validArtifacts,
				trades: [
					{ date: '2015-01-05', symbol: 'SPY', action: 'INVALID', shares: 200, price: 200, amount: 40000 },
				],
			};
			expect(validateBacktestArtifacts(artifacts)).toBe(false);
		});

		it('should reject trade with negative shares', () => {
			const artifacts = {
				...validArtifacts,
				trades: [
					{ date: '2015-01-05', symbol: 'SPY', action: 'BUY', shares: -200, price: 200, amount: 40000 },
				],
			};
			expect(validateBacktestArtifacts(artifacts)).toBe(false);
		});
	});

	describe('calculateProfit', () => {
		it('should calculate profit correctly', () => {
			expect(calculateProfit(validMetrics)).toBe(112000); // 212000 - 100000
		});

		it('should handle negative profit (loss)', () => {
			const lossMetrics = { ...validMetrics, final_value: 80000 };
			expect(calculateProfit(lossMetrics)).toBe(-20000);
		});
	});

	describe('formatReturn', () => {
		it('should format positive return', () => {
			expect(formatReturn(0.087)).toBe('+8.70%');
		});

		it('should format negative return', () => {
			expect(formatReturn(-0.15)).toBe('-15.00%');
		});

		it('should format zero return', () => {
			expect(formatReturn(0)).toBe('+0.00%');
		});

		it('should format large return', () => {
			expect(formatReturn(1.5)).toBe('+150.00%');
		});
	});

	describe('getBacktestDurationDays', () => {
		it('should calculate duration in days', () => {
			const metrics: BacktestMetrics = {
				...validMetrics,
				start_date: '2020-01-01',
				end_date: '2020-01-11',
			};
			expect(getBacktestDurationDays(metrics)).toBe(10);
		});

		it('should handle full backtest period', () => {
			// 2015-01-01 to 2025-12-31 is about 4017 days
			const days = getBacktestDurationDays(validMetrics);
			expect(days).toBeGreaterThan(4000);
			expect(days).toBeLessThan(4100);
		});
	});
});
