import { describe, it, expect } from 'vitest';
import {
	validateHolding,
	createHolding,
	calculateTotalValue,
	calculateTotalCostBasis,
	calculateTotalUnrealizedGainLoss,
	groupByAssetClass,
	type Holding,
	type AssetClass,
} from '../../../Entities/Holding';

describe('Holding', () => {
	describe('validateHolding', () => {
		it('should validate a valid holding', () => {
			const holding: Holding = {
				ticker: 'SPY',
				shares: 100,
			};

			expect(validateHolding(holding)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateHolding(null)).toBe(false);
			expect(validateHolding(undefined)).toBe(false);
			expect(validateHolding('string')).toBe(false);
			expect(validateHolding(123)).toBe(false);
		});

		it('should reject missing ticker', () => {
			const holding = {
				shares: 100,
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should reject missing shares', () => {
			const holding = {
				ticker: 'SPY',
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should reject negative shares', () => {
			const holding = {
				ticker: 'SPY',
				shares: -10,
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should reject invalid asset class', () => {
			const holding = {
				ticker: 'SPY',
				shares: 100,
				asset_class: 'invalid' as AssetClass,
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should validate all valid asset classes', () => {
			const validAssetClasses: AssetClass[] = ['equity', 'bonds', 'real_assets', 'cash'];

			validAssetClasses.forEach((assetClass) => {
				const holding: Holding = {
					ticker: 'SPY',
					shares: 100,
					asset_class: assetClass,
				};

				expect(validateHolding(holding)).toBe(true);
			});
		});

		it('should reject negative current_value', () => {
			const holding = {
				ticker: 'SPY',
				shares: 100,
				current_value: -10,
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should reject negative cost_basis', () => {
			const holding = {
				ticker: 'SPY',
				shares: 100,
				cost_basis: -10,
			};

			expect(validateHolding(holding)).toBe(false);
		});

		it('should validate optional fields', () => {
			const holding: Holding = {
				ticker: 'SPY',
				shares: 100,
				current_value: 50000,
				cost_basis: 45000,
				unrealized_gain_loss: 5000,
				asset_class: 'equity',
				purchase_date: '2025-01-01',
			};

			expect(validateHolding(holding)).toBe(true);
		});
	});

	describe('createHolding', () => {
		it('should create a valid holding with required fields', () => {
			const holding = createHolding('SPY', 100);

			expect(validateHolding(holding)).toBe(true);
			expect(holding.ticker).toBe('SPY');
			expect(holding.shares).toBe(100);
		});

		it('should calculate unrealized gain/loss when current_value and cost_basis provided', () => {
			const holding = createHolding('SPY', 100, {
				current_value: 50000,
				cost_basis: 45000,
			});

			expect(holding.unrealized_gain_loss).toBe(5000);
		});

		it('should calculate negative unrealized gain/loss for loss', () => {
			const holding = createHolding('SPY', 100, {
				current_value: 40000,
				cost_basis: 45000,
			});

			expect(holding.unrealized_gain_loss).toBe(-5000);
		});

		it('should create holding with optional fields', () => {
			const holding = createHolding('QQQ', 50, {
				current_value: 25000,
				cost_basis: 22000,
				asset_class: 'equity',
				purchase_date: '2025-01-01',
			});

			expect(holding.ticker).toBe('QQQ');
			expect(holding.shares).toBe(50);
			expect(holding.current_value).toBe(25000);
			expect(holding.cost_basis).toBe(22000);
			expect(holding.unrealized_gain_loss).toBe(3000);
			expect(holding.asset_class).toBe('equity');
			expect(holding.purchase_date).toBe('2025-01-01');
		});
	});

	describe('calculateTotalValue', () => {
		it('should return 0 for empty array', () => {
			expect(calculateTotalValue([])).toBe(0);
		});

		it('should calculate total value of holdings', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, current_value: 50000 },
				{ ticker: 'QQQ', shares: 50, current_value: 25000 },
				{ ticker: 'VNQ', shares: 200, current_value: 15000 },
			];

			expect(calculateTotalValue(holdings)).toBe(90000);
		});

		it('should handle holdings without current_value', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, current_value: 50000 },
				{ ticker: 'QQQ', shares: 50 }, // no current_value
			];

			expect(calculateTotalValue(holdings)).toBe(50000);
		});
	});

	describe('calculateTotalCostBasis', () => {
		it('should return 0 for empty array', () => {
			expect(calculateTotalCostBasis([])).toBe(0);
		});

		it('should calculate total cost basis', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, cost_basis: 45000 },
				{ ticker: 'QQQ', shares: 50, cost_basis: 22000 },
				{ ticker: 'VNQ', shares: 200, cost_basis: 14000 },
			];

			expect(calculateTotalCostBasis(holdings)).toBe(81000);
		});

		it('should handle holdings without cost_basis', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, cost_basis: 45000 },
				{ ticker: 'QQQ', shares: 50 }, // no cost_basis
			];

			expect(calculateTotalCostBasis(holdings)).toBe(45000);
		});
	});

	describe('calculateTotalUnrealizedGainLoss', () => {
		it('should return 0 for empty array', () => {
			expect(calculateTotalUnrealizedGainLoss([])).toBe(0);
		});

		it('should calculate total unrealized gain/loss', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, unrealized_gain_loss: 5000 },
				{ ticker: 'QQQ', shares: 50, unrealized_gain_loss: 3000 },
				{ ticker: 'VNQ', shares: 200, unrealized_gain_loss: -2000 },
			];

			expect(calculateTotalUnrealizedGainLoss(holdings)).toBe(6000);
		});

		it('should handle holdings without unrealized_gain_loss', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, unrealized_gain_loss: 5000 },
				{ ticker: 'QQQ', shares: 50 }, // no unrealized_gain_loss
			];

			expect(calculateTotalUnrealizedGainLoss(holdings)).toBe(5000);
		});
	});

	describe('groupByAssetClass', () => {
		it('should return empty groups for empty array', () => {
			const grouped = groupByAssetClass([]);

			expect(grouped.equity).toEqual([]);
			expect(grouped.bonds).toEqual([]);
			expect(grouped.real_assets).toEqual([]);
			expect(grouped.cash).toEqual([]);
		});

		it('should group holdings by asset class', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100, asset_class: 'equity' },
				{ ticker: 'QQQ', shares: 50, asset_class: 'equity' },
				{ ticker: 'TLT', shares: 200, asset_class: 'bonds' },
				{ ticker: 'VNQ', shares: 150, asset_class: 'real_assets' },
				{ ticker: 'SHY', shares: 100, asset_class: 'cash' },
			];

			const grouped = groupByAssetClass(holdings);

			expect(grouped.equity).toHaveLength(2);
			expect(grouped.equity[0].ticker).toBe('SPY');
			expect(grouped.equity[1].ticker).toBe('QQQ');
			expect(grouped.bonds).toHaveLength(1);
			expect(grouped.bonds[0].ticker).toBe('TLT');
			expect(grouped.real_assets).toHaveLength(1);
			expect(grouped.real_assets[0].ticker).toBe('VNQ');
			expect(grouped.cash).toHaveLength(1);
			expect(grouped.cash[0].ticker).toBe('SHY');
		});

		it('should default to equity for holdings without asset_class', () => {
			const holdings: Holding[] = [
				{ ticker: 'SPY', shares: 100 }, // no asset_class
				{ ticker: 'QQQ', shares: 50, asset_class: 'equity' },
			];

			const grouped = groupByAssetClass(holdings);

			expect(grouped.equity).toHaveLength(2);
		});
	});
});
