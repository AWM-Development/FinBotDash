import { describe, it, expect } from 'vitest';
import {
	validateRebalancePacket,
	createRebalancePacket,
	calculateTotalTradeAmount,
	getTradeCountsByAction,
	type RebalancePacket,
	type RebalancePacketStatus,
	type TargetAllocation,
	type ProposedTrade,
} from '../../../Entities/RebalancePacket';

describe('RebalancePacket', () => {
	describe('validateRebalancePacket', () => {
		it('should validate a valid rebalance packet', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateRebalancePacket(null)).toBe(false);
			expect(validateRebalancePacket(undefined)).toBe(false);
			expect(validateRebalancePacket('string')).toBe(false);
			expect(validateRebalancePacket(123)).toBe(false);
		});

		it('should reject missing date', () => {
			const packet = {
				status: 'PROPOSED',
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject invalid status', () => {
			const packet = {
				date: '2026-01-11',
				status: 'invalid_status' as RebalancePacketStatus,
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should validate all valid statuses', () => {
			const validStatuses: RebalancePacketStatus[] = ['PROPOSED', 'APPROVED', 'EXECUTED', 'CANCELED'];

			validStatuses.forEach((status) => {
				const packet: RebalancePacket = {
					date: '2026-01-11',
					strategy_id: 'test-strategy',
					status,
					target_allocations: [],
					created_at: '2026-01-11T10:00:00Z',
				};

				expect(validateRebalancePacket(packet)).toBe(true);
			});
		});

		it('should validate target allocations', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [
					{ symbol: 'SPY', target_weight: 0.333, current_weight: 0.352 },
					{ symbol: 'QQQ', target_weight: 0.333, current_weight: 0.285 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject invalid target allocations', () => {
			const packet = {
				date: '2026-01-11',
				target_allocations: [
					{ symbol: 'SPY', target_weight: 1.5, current_weight: 0.352 }, // invalid weight > 1
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject target allocations without symbol', () => {
			const packet = {
				date: '2026-01-11',
				target_allocations: [
					{ target_weight: 0.333, current_weight: 0.352 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should validate proposed trades', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
					{ action: 'SELL', symbol: 'IWM', amount: 4000, shares: 20, price: 200, reason: 'Regime shift' },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject invalid trade action', () => {
			const packet = {
				date: '2026-01-11',
				proposed_trades: [
					{ action: 'Invalid', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades without symbol', () => {
			const packet = {
				date: '2026-01-11',
				proposed_trades: [
					{ action: 'BUY', amount: 6000, shares: 12, price: 500 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades with negative amount', () => {
			const packet = {
				date: '2026-01-11',
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: -1000, shares: 12, price: 500 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades with zero or negative shares', () => {
			const packet = {
				date: '2026-01-11',
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 0, price: 500 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});
	});

	describe('createRebalancePacket', () => {
		it('should create a valid rebalance packet with required fields', () => {
			const packet = createRebalancePacket('2026-01-11', 'test-strategy');

			expect(validateRebalancePacket(packet)).toBe(true);
			expect(packet.date).toBe('2026-01-11');
			expect(packet.strategy_id).toBe('test-strategy');
			expect(packet.status).toBe('PROPOSED');
			expect(packet.created_at).toBeDefined();
		});

		it('should create packet with optional fields', () => {
			const targetAllocations: TargetAllocation[] = [
				{ symbol: 'SPY', target_weight: 0.333, current_weight: 0.352 },
			];
			const proposedTrades: ProposedTrade[] = [
				{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
			];

			const packet = createRebalancePacket('2026-01-11', 'baseline-v1', {
				status: 'APPROVED',
				target_allocations: targetAllocations,
				proposed_trades: proposedTrades,
				regime: 'TRENDING_RISK_ON',
				confidence: 0.85,
			});

			expect(packet.status).toBe('APPROVED');
			expect(packet.target_allocations).toEqual(targetAllocations);
			expect(packet.proposed_trades).toEqual(proposedTrades);
			expect(packet.regime).toBe('TRENDING_RISK_ON');
			expect(packet.confidence).toBe(0.85);
		});
	});

	describe('calculateTotalTradeAmount', () => {
		it('should return 0 for packet without trades', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(calculateTotalTradeAmount(packet)).toBe(0);
		});

		it('should calculate total trade amount (buys positive, sells negative)', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
					{ action: 'SELL', symbol: 'IWM', amount: 4000, shares: 20, price: 200 },
					{ action: 'BUY', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(calculateTotalTradeAmount(packet)).toBe(4000); // 6000 - 4000 + 2000
		});

		it('should handle only buys', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
					{ action: 'BUY', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(calculateTotalTradeAmount(packet)).toBe(8000);
		});

		it('should handle only sells', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'SELL', symbol: 'IWM', amount: 4000, shares: 20, price: 200 },
					{ action: 'SELL', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			expect(calculateTotalTradeAmount(packet)).toBe(-6000);
		});
	});

	describe('getTradeCountsByAction', () => {
		it('should return zeros for packet without trades', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				created_at: '2026-01-11T10:00:00Z',
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(0);
			expect(counts.sell).toBe(0);
		});

		it('should count trades by action', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
					{ action: 'BUY', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
					{ action: 'SELL', symbol: 'IWM', amount: 4000, shares: 20, price: 200 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(2);
			expect(counts.sell).toBe(1);
		});

		it('should handle only buys', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'BUY', symbol: 'QQQ', amount: 6000, shares: 12, price: 500 },
					{ action: 'BUY', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(2);
			expect(counts.sell).toBe(0);
		});

		it('should handle only sells', () => {
			const packet: RebalancePacket = {
				date: '2026-01-11',
				strategy_id: 'test-strategy',
				status: 'PROPOSED',
				target_allocations: [],
				proposed_trades: [
					{ action: 'SELL', symbol: 'IWM', amount: 4000, shares: 20, price: 200 },
					{ action: 'SELL', symbol: 'VNQ', amount: 2000, shares: 30, price: 66.67 },
				],
				created_at: '2026-01-11T10:00:00Z',
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(0);
			expect(counts.sell).toBe(2);
		});
	});
});
