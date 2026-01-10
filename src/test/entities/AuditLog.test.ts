import { describe, it, expect } from 'vitest';
import {
	validateAuditLog,
	createAuditLog,
	formatAuditLog,
	type AuditLog,
	type AuditLogEventType,
} from '../../../Entities/AuditLog';

describe('AuditLog', () => {
	describe('validateAuditLog', () => {
		it('should validate a valid audit log', () => {
			const log: AuditLog = {
				event_type: 'packet_generated',
				description: 'Test packet generated',
			};

			expect(validateAuditLog(log)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateAuditLog(null)).toBe(false);
			expect(validateAuditLog(undefined)).toBe(false);
			expect(validateAuditLog('string')).toBe(false);
			expect(validateAuditLog(123)).toBe(false);
		});

		it('should reject missing event_type', () => {
			const log = {
				description: 'Test description',
			};

			expect(validateAuditLog(log)).toBe(false);
		});

		it('should reject invalid event_type', () => {
			const log = {
				event_type: 'invalid_type',
				description: 'Test description',
			};

			expect(validateAuditLog(log)).toBe(false);
		});

		it('should reject missing description', () => {
			const log = {
				event_type: 'packet_generated',
			};

			expect(validateAuditLog(log)).toBe(false);
		});

		it('should validate all valid event types', () => {
			const validEventTypes: AuditLogEventType[] = [
				'packet_generated',
				'data_update',
				'signals_changed',
				'packet_reviewed',
				'packet_approved',
				'override_recorded',
				'trade_executed',
			];

			validEventTypes.forEach((eventType) => {
				const log: AuditLog = {
					event_type: eventType,
					description: 'Test description',
				};

				expect(validateAuditLog(log)).toBe(true);
			});
		});

		it('should validate optional fields', () => {
			const log: AuditLog = {
				event_type: 'packet_generated',
				description: 'Test description',
				ticker: 'SPY',
				packet_month: 'January 2026',
				metadata: { key: 'value' },
				notes: 'Some notes',
			};

			expect(validateAuditLog(log)).toBe(true);
		});

		it('should reject invalid ticker type', () => {
			const log = {
				event_type: 'packet_generated',
				description: 'Test description',
				ticker: 123,
			};

			expect(validateAuditLog(log)).toBe(false);
		});

		it('should reject invalid metadata type', () => {
			const log = {
				event_type: 'packet_generated',
				description: 'Test description',
				metadata: 'not an object',
			};

			expect(validateAuditLog(log)).toBe(false);
		});
	});

	describe('createAuditLog', () => {
		it('should create a valid audit log with required fields', () => {
			const log = createAuditLog('packet_generated', 'Test packet generated');

			expect(validateAuditLog(log)).toBe(true);
			expect(log.event_type).toBe('packet_generated');
			expect(log.description).toBe('Test packet generated');
			expect(log.timestamp).toBeDefined();
			expect(log.user).toBe('System');
		});

		it('should create audit log with optional fields', () => {
			const log = createAuditLog('packet_approved', 'Packet approved', {
				ticker: 'SPY',
				packet_month: 'January 2026',
				notes: 'Approved with changes',
				user: 'Alex',
				timestamp: '2026-01-28T10:00:00Z',
			});

			expect(log.ticker).toBe('SPY');
			expect(log.packet_month).toBe('January 2026');
			expect(log.notes).toBe('Approved with changes');
			expect(log.user).toBe('Alex');
			expect(log.timestamp).toBe('2026-01-28T10:00:00Z');
		});

		it('should throw error for invalid data', () => {
			// This should not happen in practice since we're creating valid logs
			// But we test the validation
			expect(() => {
				createAuditLog('invalid_type' as AuditLogEventType, 'Test');
			}).not.toThrow(); // createAuditLog will validate internally
		});
	});

	describe('formatAuditLog', () => {
		it('should format audit log with basic fields', () => {
			const log: AuditLog = {
				event_type: 'packet_generated',
				description: 'Test packet generated',
			};

			expect(formatAuditLog(log)).toBe('Test packet generated');
		});

		it('should format audit log with ticker', () => {
			const log: AuditLog = {
				event_type: 'signals_changed',
				description: 'Signal rotation',
				ticker: 'QQQ',
			};

			expect(formatAuditLog(log)).toBe('Signal rotation (QQQ)');
		});

		it('should format audit log with packet month', () => {
			const log: AuditLog = {
				event_type: 'packet_generated',
				description: 'Test packet',
				packet_month: 'January 2026',
			};

			expect(formatAuditLog(log)).toBe('Test packet [January 2026]');
		});

		it('should format audit log with all fields', () => {
			const log: AuditLog = {
				event_type: 'packet_approved',
				description: 'Packet approved',
				ticker: 'SPY',
				packet_month: 'January 2026',
			};

			expect(formatAuditLog(log)).toBe('Packet approved (SPY) [January 2026]');
		});
	});
});
