export type RebalancePacketStatus = "PROPOSED" | "APPROVED" | "EXECUTED" | "CANCELED";

export interface TargetAllocation {
	symbol: string;
	target_weight: number;
	current_weight: number;
}

export interface ProposedTrade {
	action: "BUY" | "SELL";
	symbol: string;
	shares: number;
	price: number;
	amount: number;
	reason?: string;
	notes?: string;
}

export interface TaxNotes {
	tlh_opportunities?: Array<{
		symbol: string;
		unrealized_loss: number;
		replacement?: string;
		estimated_savings: number;
	}>;
	wash_sale_warnings?: Array<{
		symbol: string;
		sold_date: string;
		end_date: string;
		days_remaining: number;
	}>;
	estimated_realized_gain_loss?: number;
}

export interface AIExplanation {
	why_these_holdings?: string;
	risk_posture_change?: string;
	what_could_go_wrong?: string;
	what_would_cause_flip?: string[];
}

export interface RebalancePacket {
	id?: string;
	date: string;
	strategy_id: string;
	status: RebalancePacketStatus;
	target_allocations: TargetAllocation[];
	proposed_trades?: ProposedTrade[];
	tax_notes?: TaxNotes;
	ai_explanation?: AIExplanation;
	regime?: string;
	confidence?: number;
	expected_turnover?: number;
	human_notes?: string;
	reviewed_at?: string;
	approved_at?: string;
	executed_at?: string;
	created_at: string;
}

/**
 * Validates a RebalancePacket object
 */
export function validateRebalancePacket(packet: unknown): packet is RebalancePacket {
	if (typeof packet !== "object" || packet === null) {
		return false;
	}

	const p = packet as Partial<RebalancePacket>;

	if (!p.date || typeof p.date !== "string") {
		return false;
	}

	if (p.status !== undefined) {
		const validStatuses: RebalancePacketStatus[] = ["PROPOSED", "APPROVED", "EXECUTED", "CANCELED"];
		if (!validStatuses.includes(p.status)) {
			return false;
		}
	}

	if (p.target_allocations !== undefined && !Array.isArray(p.target_allocations)) {
		return false;
	}

	if (p.target_allocations) {
		for (const alloc of p.target_allocations) {
			if (!alloc.symbol || typeof alloc.symbol !== "string") {
				return false;
			}
			if (typeof alloc.target_weight !== "number" || alloc.target_weight < 0 || alloc.target_weight > 1) {
				return false;
			}
			if (typeof alloc.current_weight !== "number" || alloc.current_weight < 0 || alloc.current_weight > 1) {
				return false;
			}
		}
	}

	if (p.proposed_trades !== undefined && !Array.isArray(p.proposed_trades)) {
		return false;
	}

	if (p.proposed_trades) {
		for (const trade of p.proposed_trades) {
			if (trade.action !== "BUY" && trade.action !== "SELL") {
				return false;
			}
			if (!trade.symbol || typeof trade.symbol !== "string") {
				return false;
			}
			if (typeof trade.amount !== "number" || trade.amount < 0) {
				return false;
			}
			if (typeof trade.shares !== "number" || trade.shares <= 0) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Creates a new RebalancePacket
 */
export function createRebalancePacket(
	date: string,
	strategy_id: string,
	options?: Partial<Omit<RebalancePacket, "date" | "strategy_id">>
): RebalancePacket {
	const packet: RebalancePacket = {
		date,
		strategy_id,
		status: "PROPOSED",
		target_allocations: [],
		created_at: new Date().toISOString(),
		...options,
	};

	if (!validateRebalancePacket(packet)) {
		throw new Error("Invalid RebalancePacket data");
	}

	return packet;
}

/**
 * Calculates the total amount of proposed trades
 */
export function calculateTotalTradeAmount(packet: RebalancePacket): number {
	if (!packet.proposed_trades) {
		return 0;
	}

	return packet.proposed_trades.reduce((total, trade) => {
		return total + (trade.action === "BUY" ? trade.amount : -trade.amount);
	}, 0);
}

/**
 * Gets the count of proposed trades by action
 */
export function getTradeCountsByAction(packet: RebalancePacket): { buy: number; sell: number } {
	if (!packet.proposed_trades) {
		return { buy: 0, sell: 0 };
	}

	return packet.proposed_trades.reduce(
		(counts, trade) => {
			if (trade.action === "BUY") {
				counts.buy++;
			} else {
				counts.sell++;
			}
			return counts;
		},
		{ buy: 0, sell: 0 }
	);
}
