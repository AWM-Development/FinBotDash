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
				month: 'January 2026',
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject null or non-object values', () => {
			expect(validateRebalancePacket(null)).toBe(false);
			expect(validateRebalancePacket(undefined)).toBe(false);
			expect(validateRebalancePacket('string')).toBe(false);
			expect(validateRebalancePacket(123)).toBe(false);
		});

		it('should reject missing month', () => {
			const packet = {
				status: 'pending',
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject invalid status', () => {
			const packet = {
				month: 'January 2026',
				status: 'invalid_status' as RebalancePacketStatus,
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should validate all valid statuses', () => {
			const validStatuses: RebalancePacketStatus[] = ['pending', 'reviewed', 'approved', 'executed'];

			validStatuses.forEach((status) => {
				const packet: RebalancePacket = {
					month: 'January 2026',
					status,
				};

				expect(validateRebalancePacket(packet)).toBe(true);
			});
		});

		it('should validate target allocations', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				target_allocations: [
					{ ticker: 'SPY', target_weight: 33.33, current_weight: 35.2 },
					{ ticker: 'QQQ', target_weight: 33.33, current_weight: 28.5 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject invalid target allocations', () => {
			const packet = {
				month: 'January 2026',
				target_allocations: [
					{ ticker: 'SPY', target_weight: 150, current_weight: 35.2 }, // invalid weight > 100
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject target allocations without ticker', () => {
			const packet = {
				month: 'January 2026',
				target_allocations: [
					{ target_weight: 33.33, current_weight: 35.2 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should validate proposed trades', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12, reason: 'Rebalance' },
					{ action: 'Sell', ticker: 'IWM', amount: 4000, shares: 20, reason: 'Regime shift' },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(true);
		});

		it('should reject invalid trade action', () => {
			const packet = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Invalid', ticker: 'QQQ', amount: 6000, shares: 12 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades without ticker', () => {
			const packet = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', amount: 6000, shares: 12 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades with negative amount', () => {
			const packet = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: -1000, shares: 12 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});

		it('should reject trades with zero or negative shares', () => {
			const packet = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 0 },
				],
			};

			expect(validateRebalancePacket(packet)).toBe(false);
		});
	});

	describe('createRebalancePacket', () => {
		it('should create a valid rebalance packet with required fields', () => {
			const packet = createRebalancePacket('January 2026');

			expect(validateRebalancePacket(packet)).toBe(true);
			expect(packet.month).toBe('January 2026');
			expect(packet.status).toBe('pending');
			expect(packet.generated_at).toBeDefined();
		});

		it('should create packet with optional fields', () => {
			const targetAllocations: TargetAllocation[] = [
				{ ticker: 'SPY', target_weight: 33.33, current_weight: 35.2 },
			];
			const proposedTrades: ProposedTrade[] = [
				{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12 },
			];

			const packet = createRebalancePacket('January 2026', {
				strategy_id: 'baseline-v1',
				status: 'reviewed',
				target_allocations: targetAllocations,
				proposed_trades: proposedTrades,
				regime: 'Risk-On',
			});

			expect(packet.strategy_id).toBe('baseline-v1');
			expect(packet.status).toBe('reviewed');
			expect(packet.target_allocations).toEqual(targetAllocations);
			expect(packet.proposed_trades).toEqual(proposedTrades);
			expect(packet.regime).toBe('Risk-On');
		});
	});

	describe('calculateTotalTradeAmount', () => {
		it('should return 0 for packet without trades', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
			};

			expect(calculateTotalTradeAmount(packet)).toBe(0);
		});

		it('should calculate total trade amount (buys positive, sells negative)', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12 },
					{ action: 'Sell', ticker: 'IWM', amount: 4000, shares: 20 },
					{ action: 'Buy', ticker: 'VNQ', amount: 2000, shares: 30 },
				],
			};

			expect(calculateTotalTradeAmount(packet)).toBe(4000); // 6000 - 4000 + 2000
		});

		it('should handle only buys', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12 },
					{ action: 'Buy', ticker: 'VNQ', amount: 2000, shares: 30 },
				],
			};

			expect(calculateTotalTradeAmount(packet)).toBe(8000);
		});

		it('should handle only sells', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Sell', ticker: 'IWM', amount: 4000, shares: 20 },
					{ action: 'Sell', ticker: 'VNQ', amount: 2000, shares: 30 },
				],
			};

			expect(calculateTotalTradeAmount(packet)).toBe(-6000);
		});
	});

	describe('getTradeCountsByAction', () => {
		it('should return zeros for packet without trades', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(0);
			expect(counts.sell).toBe(0);
		});

		it('should count trades by action', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12 },
					{ action: 'Buy', ticker: 'VNQ', amount: 2000, shares: 30 },
					{ action: 'Sell', ticker: 'IWM', amount: 4000, shares: 20 },
				],
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(2);
			expect(counts.sell).toBe(1);
		});

		it('should handle only buys', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Buy', ticker: 'QQQ', amount: 6000, shares: 12 },
					{ action: 'Buy', ticker: 'VNQ', amount: 2000, shares: 30 },
				],
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(2);
			expect(counts.sell).toBe(0);
		});

		it('should handle only sells', () => {
			const packet: RebalancePacket = {
				month: 'January 2026',
				proposed_trades: [
					{ action: 'Sell', ticker: 'IWM', amount: 4000, shares: 20 },
					{ action: 'Sell', ticker: 'VNQ', amount: 2000, shares: 30 },
				],
			};

			const counts = getTradeCountsByAction(packet);
			expect(counts.buy).toBe(0);
			expect(counts.sell).toBe(2);
		});
	});
});
