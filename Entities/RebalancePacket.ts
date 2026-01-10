export type RebalancePacketStatus = "pending" | "reviewed" | "approved" | "executed";

export interface TargetAllocation {
	ticker: string;
	target_weight: number;
	current_weight: number;
}

export interface ProposedTrade {
	action: "Buy" | "Sell";
	ticker: string;
	amount: number;
	shares: number;
	reason?: string;
	notes?: string;
}

export interface TaxNotes {
	tlh_opportunities?: Array<{
		ticker: string;
		unrealized_loss: number;
		replacement: string;
		estimated_savings: number;
	}>;
	wash_sale_warnings?: Array<{
		ticker: string;
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
	id?: number;
	month: string;
	strategy_id?: string;
	status?: RebalancePacketStatus;
	target_allocations?: TargetAllocation[];
	proposed_trades?: ProposedTrade[];
	tax_notes?: TaxNotes;
	ai_explanation?: AIExplanation;
	regime?: string;
	risk_posture?: string;
	reviewed_at?: string;
	approved_at?: string;
	reviewer_notes?: string;
	generated_at?: string;
}

/**
 * Validates a RebalancePacket object
 */
export function validateRebalancePacket(packet: unknown): packet is RebalancePacket {
	if (typeof packet !== "object" || packet === null) {
		return false;
	}

	const p = packet as Partial<RebalancePacket>;

	if (!p.month || typeof p.month !== "string") {
		return false;
	}

	if (p.status !== undefined) {
		const validStatuses: RebalancePacketStatus[] = ["pending", "reviewed", "approved", "executed"];
		if (!validStatuses.includes(p.status)) {
			return false;
		}
	}

	if (p.target_allocations !== undefined && !Array.isArray(p.target_allocations)) {
		return false;
	}

	if (p.target_allocations) {
		for (const alloc of p.target_allocations) {
			if (!alloc.ticker || typeof alloc.ticker !== "string") {
				return false;
			}
			if (typeof alloc.target_weight !== "number" || alloc.target_weight < 0 || alloc.target_weight > 100) {
				return false;
			}
			if (typeof alloc.current_weight !== "number" || alloc.current_weight < 0 || alloc.current_weight > 100) {
				return false;
			}
		}
	}

	if (p.proposed_trades !== undefined && !Array.isArray(p.proposed_trades)) {
		return false;
	}

	if (p.proposed_trades) {
		for (const trade of p.proposed_trades) {
			if (trade.action !== "Buy" && trade.action !== "Sell") {
				return false;
			}
			if (!trade.ticker || typeof trade.ticker !== "string") {
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
	month: string,
	options?: Partial<Omit<RebalancePacket, "month">>
): RebalancePacket {
	const packet: RebalancePacket = {
		month,
		status: "pending",
		generated_at: new Date().toISOString(),
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
		return total + (trade.action === "Buy" ? trade.amount : -trade.amount);
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
			if (trade.action === "Buy") {
				counts.buy++;
			} else {
				counts.sell++;
			}
			return counts;
		},
		{ buy: 0, sell: 0 }
	);
}
