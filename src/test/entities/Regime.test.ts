import { describe, it, expect } from 'vitest';
import {
	validateRegime,
	createRegime,
	REGIME_LABELS,
	type Regime,
} from '../../../Entities/Regime';

describe('Regime', () => {
	describe('validateRegime', () => {
		it('should validate a valid regime', () => {
			const regime: Regime = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime_label: 'TRENDING_RISK_ON',
				confidence: 0.85,
			};

			expect(validateRegime(regime)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateRegime(null)).toBe(false);
			expect(validateRegime(undefined)).toBe(false);
			expect(validateRegime('string')).toBe(false);
			expect(validateRegime(123)).toBe(false);
		});

		it('should reject missing date', () => {
			const regime = {
				strategy_id: 'test-strategy',
				regime_label: 'TRENDING_RISK_ON',
				confidence: 0.85,
			};

			expect(validateRegime(regime)).toBe(false);
		});

		it('should reject missing strategy_id', () => {
			const regime = {
				date: '2026-01-11',
				regime_label: 'TRENDING_RISK_ON',
				confidence: 0.85,
			};

			expect(validateRegime(regime)).toBe(false);
		});

		it('should reject missing regime_label', () => {
			const regime = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				confidence: 0.85,
			};

			expect(validateRegime(regime)).toBe(false);
		});

		it('should reject invalid confidence (> 1)', () => {
			const regime = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime_label: 'TRENDING_RISK_ON',
				confidence: 1.5,
			};

			expect(validateRegime(regime)).toBe(false);
		});

		it('should reject invalid confidence (< 0)', () => {
			const regime = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime_label: 'TRENDING_RISK_ON',
				confidence: -0.1,
			};

			expect(validateRegime(regime)).toBe(false);
		});

		it('should validate with optional rationale', () => {
			const regime: Regime = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				regime_label: 'TRENDING_RISK_ON',
				confidence: 0.85,
				rationale: {
					vix: 15.2,
					spy_vs_sma: 1.05,
					trend_strength: 'strong',
				},
			};

			expect(validateRegime(regime)).toBe(true);
		});
	});

	describe('createRegime', () => {
		it('should create a valid regime with required fields', () => {
			const regime = createRegime('2026-01-11', 'test-strategy', 'TRENDING_RISK_ON', 0.85);

			expect(validateRegime(regime)).toBe(true);
			expect(regime.date).toBe('2026-01-11');
			expect(regime.strategy_id).toBe('test-strategy');
			expect(regime.regime_label).toBe('TRENDING_RISK_ON');
			expect(regime.confidence).toBe(0.85);
		});

		it('should create regime with optional fields', () => {
			const regime = createRegime('2026-01-11', 'test-strategy', 'DEFENSIVE', 0.72, {
				id: 'regime-123',
				rationale: { reason: 'Market volatility' },
			});

			expect(regime.id).toBe('regime-123');
			expect(regime.rationale).toEqual({ reason: 'Market volatility' });
		});

		it('should throw error for invalid confidence', () => {
			expect(() => {
				createRegime('2026-01-11', 'test-strategy', 'TRENDING_RISK_ON', 1.5);
			}).toThrow('Invalid Regime data');
		});
	});

	describe('REGIME_LABELS', () => {
		it('should contain expected regime labels', () => {
			expect(REGIME_LABELS.TRENDING_RISK_ON).toBe('TRENDING_RISK_ON');
			expect(REGIME_LABELS.CHOPPY_RISK_ON).toBe('CHOPPY_RISK_ON');
			expect(REGIME_LABELS.RISK_OFF).toBe('RISK_OFF');
			expect(REGIME_LABELS.TRANSITIONAL).toBe('TRANSITIONAL');
			expect(REGIME_LABELS.DEFENSIVE).toBe('DEFENSIVE');
		});
	});
});
