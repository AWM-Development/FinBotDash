export type AssetClass = "equity" | "bonds" | "real_assets" | "cash";

export interface Holding {
	symbol: string;
	shares: number;
	current_value?: number;
	cost_basis?: number;
	unrealized_gain_loss?: number;
	asset_class?: AssetClass;
	purchase_date?: string;
}

/**
 * Validates a Holding object
 */
export function validateHolding(holding: unknown): holding is Holding {
	if (typeof holding !== "object" || holding === null) {
		return false;
	}

	const h = holding as Partial<Holding>;

	if (!h.symbol || typeof h.symbol !== "string") {
		return false;
	}

	if (typeof h.shares !== "number" || h.shares < 0) {
		return false;
	}

	if (h.current_value !== undefined && (typeof h.current_value !== "number" || h.current_value < 0)) {
		return false;
	}

	if (h.cost_basis !== undefined && (typeof h.cost_basis !== "number" || h.cost_basis < 0)) {
		return false;
	}

	if (h.unrealized_gain_loss !== undefined && typeof h.unrealized_gain_loss !== "number") {
		return false;
	}

	if (h.asset_class !== undefined) {
		const validAssetClasses: AssetClass[] = ["equity", "bonds", "real_assets", "cash"];
		if (!validAssetClasses.includes(h.asset_class)) {
			return false;
		}
	}

	if (h.purchase_date !== undefined && h.purchase_date !== null && typeof h.purchase_date !== "string") {
		return false;
	}

	return true;
}

/**
 * Creates a new Holding
 */
export function createHolding(
	symbol: string,
	shares: number,
	options?: Partial<Omit<Holding, "symbol" | "shares">>
): Holding {
	const holding: Holding = {
		symbol,
		shares,
		...options,
	};

	// Calculate unrealized gain/loss if current_value and cost_basis are provided
	if (holding.current_value !== undefined && holding.cost_basis !== undefined) {
		holding.unrealized_gain_loss = holding.current_value - holding.cost_basis;
	}

	if (!validateHolding(holding)) {
		throw new Error("Invalid Holding data");
	}

	return holding;
}

/**
 * Calculates the total value of multiple holdings
 */
export function calculateTotalValue(holdings: Holding[]): number {
	return holdings.reduce((total, holding) => {
		return total + (holding.current_value || 0);
	}, 0);
}

/**
 * Calculates the total cost basis of multiple holdings
 */
export function calculateTotalCostBasis(holdings: Holding[]): number {
	return holdings.reduce((total, holding) => {
		return total + (holding.cost_basis || 0);
	}, 0);
}

/**
 * Calculates the total unrealized gain/loss of multiple holdings
 */
export function calculateTotalUnrealizedGainLoss(holdings: Holding[]): number {
	return holdings.reduce((total, holding) => {
		return total + (holding.unrealized_gain_loss || 0);
	}, 0);
}

/**
 * Groups holdings by asset class
 */
export function groupByAssetClass(holdings: Holding[]): Record<AssetClass, Holding[]> {
	const grouped: Record<AssetClass, Holding[]> = {
		equity: [],
		bonds: [],
		real_assets: [],
		cash: [],
	};

	holdings.forEach((holding) => {
		const assetClass = holding.asset_class || "equity";
		if (assetClass in grouped) {
			grouped[assetClass].push(holding);
		}
	});

	return grouped;
}
