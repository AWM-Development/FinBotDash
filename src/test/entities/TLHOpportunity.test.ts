import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
	validateTLHOpportunity,
	createTLHOpportunity,
	calculateEstimatedSavings,
	isTLHOpportunityAvailable,
	isTLHOpportunityExpired,
	getDaysUntilWashSaleEnd,
	type TLHOpportunity,
	type TLHStatus,
} from '../../../Entities/TLHOpportunity';

describe('TLHOpportunity', () => {
	describe('validateTLHOpportunity', () => {
		it('should validate a valid TLH opportunity', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
			};

			expect(validateTLHOpportunity(opportunity)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateTLHOpportunity(null)).toBe(false);
			expect(validateTLHOpportunity(undefined)).toBe(false);
			expect(validateTLHOpportunity('string')).toBe(false);
			expect(validateTLHOpportunity(123)).toBe(false);
		});

		it('should reject missing ticker', () => {
			const opportunity = {
				unrealized_loss: -1240,
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject missing unrealized_loss', () => {
			const opportunity = {
				ticker: 'VTI',
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject non-negative unrealized_loss', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: 1240, // should be negative
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject invalid status', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'invalid_status' as TLHStatus,
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should validate all valid statuses', () => {
			const validStatuses: TLHStatus[] = ['available', 'added_to_packet', 'executed', 'expired'];

			validStatuses.forEach((status) => {
				const opportunity: TLHOpportunity = {
					ticker: 'VTI',
					unrealized_loss: -1240,
					status,
				};

				expect(validateTLHOpportunity(opportunity)).toBe(true);
			});
		});

		it('should reject invalid replacement_ticker type', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				replacement_ticker: 123, // should be string
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject invalid estimated_savings (negative)', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				estimated_savings: -100,
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject invalid tax_bracket (out of range)', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				tax_bracket: 150, // should be 0-100
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});

		it('should reject invalid tax_bracket (negative)', () => {
			const opportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				tax_bracket: -10,
			};

			expect(validateTLHOpportunity(opportunity)).toBe(false);
		});
	});

	describe('createTLHOpportunity', () => {
		it('should create a valid TLH opportunity with required fields', () => {
			const opportunity = createTLHOpportunity('VTI', -1240);

			expect(validateTLHOpportunity(opportunity)).toBe(true);
			expect(opportunity.ticker).toBe('VTI');
			expect(opportunity.unrealized_loss).toBe(-1240);
			expect(opportunity.status).toBe('available');
			expect(opportunity.detected_at).toBeDefined();
		});

		it('should calculate estimated savings when tax_bracket provided', () => {
			const opportunity = createTLHOpportunity('VTI', -1240, {
				tax_bracket: 28,
			});

			expect(opportunity.estimated_savings).toBe(347.2); // 1240 * 0.28
		});

		it('should create opportunity with optional fields', () => {
			const opportunity = createTLHOpportunity('VTI', -1240, {
				replacement_ticker: 'ITOT',
				wash_sale_end_date: '2026-02-15',
				status: 'added_to_packet',
				notes: 'TLH opportunity',
				tax_bracket: 28,
			});

			expect(opportunity.replacement_ticker).toBe('ITOT');
			expect(opportunity.wash_sale_end_date).toBe('2026-02-15');
			expect(opportunity.status).toBe('added_to_packet');
			expect(opportunity.notes).toBe('TLH opportunity');
			expect(opportunity.tax_bracket).toBe(28);
		});
	});

	describe('calculateEstimatedSavings', () => {
		it('should calculate estimated savings correctly', () => {
			const savings = calculateEstimatedSavings(-1240, 28);
			expect(savings).toBe(347.2); // 1240 * 0.28
		});

		it('should return 0 for positive unrealized loss', () => {
			const savings = calculateEstimatedSavings(1240, 28);
			expect(savings).toBe(0);
		});

		it('should return 0 for zero unrealized loss', () => {
			const savings = calculateEstimatedSavings(0, 28);
			expect(savings).toBe(0);
		});

		it('should return 0 for invalid tax bracket (0)', () => {
			const savings = calculateEstimatedSavings(-1240, 0);
			expect(savings).toBe(0);
		});

		it('should return 0 for invalid tax bracket (>100)', () => {
			const savings = calculateEstimatedSavings(-1240, 150);
			expect(savings).toBe(0);
		});

		it('should handle different tax brackets', () => {
			expect(calculateEstimatedSavings(-1000, 10)).toBe(100);
			expect(calculateEstimatedSavings(-1000, 20)).toBe(200);
			expect(calculateEstimatedSavings(-1000, 37)).toBe(370);
		});
	});

	describe('isTLHOpportunityAvailable', () => {
		it('should return false for executed opportunities', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'executed',
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(false);
		});

		it('should return false for expired opportunities', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'expired',
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(false);
		});

		it('should return false if unrealized_loss is positive', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: 1240, // positive
				status: 'available',
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(false);
		});

		it('should return false if wash sale restriction is active', () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 5); // 5 days from now

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'available',
				wash_sale_end_date: futureDate.toISOString().split('T')[0],
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(false);
		});

		it('should return true for available opportunities', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'available',
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(true);
		});

		it('should return true for added_to_packet opportunities', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				status: 'added_to_packet',
			};

			expect(isTLHOpportunityAvailable(opportunity)).toBe(true);
		});
	});

	describe('isTLHOpportunityExpired', () => {
		it('should return true if unrealized_loss is positive', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: 1240, // positive
			};

			expect(isTLHOpportunityExpired(opportunity)).toBe(true);
		});

		it('should return true if wash sale end date has passed', () => {
			const pastDate = new Date();
			pastDate.setDate(pastDate.getDate() - 5); // 5 days ago

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				wash_sale_end_date: pastDate.toISOString().split('T')[0],
			};

			expect(isTLHOpportunityExpired(opportunity)).toBe(true);
		});

		it('should return false if wash sale end date is in future', () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 5); // 5 days from now

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				wash_sale_end_date: futureDate.toISOString().split('T')[0],
			};

			expect(isTLHOpportunityExpired(opportunity)).toBe(false);
		});

		it('should return false for valid opportunities without wash sale date', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
			};

			expect(isTLHOpportunityExpired(opportunity)).toBe(false);
		});
	});

	describe('getDaysUntilWashSaleEnd', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should return null if no wash sale end date', () => {
			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
			};

			expect(getDaysUntilWashSaleEnd(opportunity)).toBe(null);
		});

		it('should calculate days remaining correctly', () => {
			vi.setSystemTime(new Date('2026-01-15'));

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				wash_sale_end_date: '2026-01-20', // 5 days from now
			};

			expect(getDaysUntilWashSaleEnd(opportunity)).toBe(5);
		});

		it('should return 0 if wash sale date has passed', () => {
			vi.setSystemTime(new Date('2026-01-20'));

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				wash_sale_end_date: '2026-01-15', // 5 days ago
			};

			expect(getDaysUntilWashSaleEnd(opportunity)).toBe(0);
		});

		it('should handle same day', () => {
			vi.setSystemTime(new Date('2026-01-15'));

			const opportunity: TLHOpportunity = {
				ticker: 'VTI',
				unrealized_loss: -1240,
				wash_sale_end_date: '2026-01-15', // today
			};

			const days = getDaysUntilWashSaleEnd(opportunity);
			expect(days).toBeGreaterThanOrEqual(0);
			expect(days).toBeLessThanOrEqual(1);
		});
	});
});
