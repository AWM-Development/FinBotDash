export type TLHStatus = "available" | "added_to_packet" | "executed" | "expired";

export interface TLHOpportunity {
	id?: number;
	ticker: string;
	unrealized_loss: number;
	replacement_ticker?: string;
	wash_sale_end_date?: string;
	status?: TLHStatus;
	notes?: string;
	detected_at?: string;
	estimated_savings?: number;
	tax_bracket?: number;
}

/**
 * Validates a TLHOpportunity object
 */
export function validateTLHOpportunity(opportunity: unknown): opportunity is TLHOpportunity {
	if (typeof opportunity !== "object" || opportunity === null) {
		return false;
	}

	const opp = opportunity as Partial<TLHOpportunity>;

	if (!opp.ticker || typeof opp.ticker !== "string") {
		return false;
	}

	if (typeof opp.unrealized_loss !== "number" || opp.unrealized_loss >= 0) {
		return false;
	}

	if (opp.replacement_ticker !== undefined && (opp.replacement_ticker === null || typeof opp.replacement_ticker !== "string")) {
		return false;
	}

	if (opp.wash_sale_end_date !== undefined && opp.wash_sale_end_date !== null && typeof opp.wash_sale_end_date !== "string") {
		return false;
	}

	if (opp.status !== undefined) {
		const validStatuses: TLHStatus[] = ["available", "added_to_packet", "executed", "expired"];
		if (!validStatuses.includes(opp.status)) {
			return false;
		}
	}

	if (opp.notes !== undefined && opp.notes !== null && typeof opp.notes !== "string") {
		return false;
	}

	if (opp.estimated_savings !== undefined && (typeof opp.estimated_savings !== "number" || opp.estimated_savings < 0)) {
		return false;
	}

	if (opp.tax_bracket !== undefined && (typeof opp.tax_bracket !== "number" || opp.tax_bracket < 0 || opp.tax_bracket > 100)) {
		return false;
	}

	return true;
}

/**
 * Creates a new TLHOpportunity
 */
export function createTLHOpportunity(
	ticker: string,
	unrealizedLoss: number,
	options?: Partial<Omit<TLHOpportunity, "ticker" | "unrealized_loss">>
): TLHOpportunity {
	const opportunity: TLHOpportunity = {
		ticker,
		unrealized_loss: unrealizedLoss,
		status: "available",
		detected_at: new Date().toISOString(),
		...options,
	};

	// Calculate estimated savings if tax_bracket is provided
	if (opportunity.tax_bracket && opportunity.unrealized_loss < 0) {
		opportunity.estimated_savings = Math.abs(opportunity.unrealized_loss) * (opportunity.tax_bracket / 100);
	}

	if (!validateTLHOpportunity(opportunity)) {
		throw new Error("Invalid TLHOpportunity data");
	}

	return opportunity;
}

/**
 * Calculates estimated tax savings for a TLH opportunity
 */
export function calculateEstimatedSavings(
	unrealizedLoss: number,
	taxBracket: number
): number {
	if (unrealizedLoss >= 0 || taxBracket <= 0 || taxBracket > 100) {
		return 0;
	}
	return Math.abs(unrealizedLoss) * (taxBracket / 100);
}

/**
 * Checks if a TLH opportunity is still available
 */
export function isTLHOpportunityAvailable(opportunity: TLHOpportunity): boolean {
	if (opportunity.status === "executed" || opportunity.status === "expired") {
		return false;
	}

	if (opportunity.wash_sale_end_date) {
		const endDate = new Date(opportunity.wash_sale_end_date);
		const today = new Date();
		if (today < endDate) {
			return false;
		}
	}

	return opportunity.unrealized_loss < 0;
}

/**
 * Checks if a TLH opportunity has expired
 */
export function isTLHOpportunityExpired(opportunity: TLHOpportunity): boolean {
	if (opportunity.unrealized_loss >= 0) {
		return true;
	}

	if (opportunity.wash_sale_end_date) {
		const endDate = new Date(opportunity.wash_sale_end_date);
		const today = new Date();
		return today > endDate;
	}

	return false;
}

/**
 * Gets days remaining until wash sale restriction ends
 */
export function getDaysUntilWashSaleEnd(opportunity: TLHOpportunity): number | null {
	if (!opportunity.wash_sale_end_date) {
		return null;
	}

	const endDate = new Date(opportunity.wash_sale_end_date);
	const today = new Date();
	const diffTime = endDate.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays > 0 ? diffDays : 0;
}
