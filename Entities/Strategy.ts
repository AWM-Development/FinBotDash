export type StrategyStatus = "active" | "paper" | "archived";

export interface StrategySettings {
	momentum_weights?: {
		three_month: number;
		six_month: number;
		twelve_month: number;
	};
	trend_filter?: {
		enabled: boolean;
		sma_period?: number;
	};
	selection_count?: number;
	equal_weight?: boolean;
	volatility_targeting?: {
		enabled: boolean;
		target_volatility?: number;
	};
	risk_free_rate?: number;
	rebalance_day?: number | "first-trading" | "last-trading";
}

export interface Strategy {
	id?: string;
	name: string;
	version?: string;
	description?: string;
	is_baseline?: boolean;
	settings?: StrategySettings;
	status?: StrategyStatus;
	created_at?: string;
	updated_at?: string;
}

/**
 * Validates a Strategy object
 */
export function validateStrategy(strategy: unknown): strategy is Strategy {
	if (typeof strategy !== "object" || strategy === null) {
		return false;
	}

	const s = strategy as Partial<Strategy>;

	if (!s.name || typeof s.name !== "string") {
		return false;
	}

	if (s.version !== undefined && typeof s.version !== "string") {
		return false;
	}

	if (s.description !== undefined && typeof s.description !== "string") {
		return false;
	}

	if (s.is_baseline !== undefined && typeof s.is_baseline !== "boolean") {
		return false;
	}

	if (s.status !== undefined) {
		const validStatuses: StrategyStatus[] = ["active", "paper", "archived"];
		if (!validStatuses.includes(s.status)) {
			return false;
		}
	}

	if (s.settings !== undefined && (typeof s.settings !== "object" || s.settings === null)) {
		return false;
	}

	return true;
}

/**
 * Creates a new Strategy
 */
export function createStrategy(
	name: string,
	options?: Partial<Omit<Strategy, "name">>
): Strategy {
	const strategy: Strategy = {
		name,
		status: "active",
		is_baseline: false,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		...options,
	};

	if (!validateStrategy(strategy)) {
		throw new Error("Invalid Strategy data");
	}

	return strategy;
}

/**
 * Checks if a strategy is locked (baseline strategies cannot be modified)
 */
export function isStrategyLocked(strategy: Strategy): boolean {
	return strategy.is_baseline === true;
}

/**
 * Checks if a strategy can be edited
 */
export function canEditStrategy(strategy: Strategy): boolean {
	return !isStrategyLocked(strategy) && strategy.status !== "archived";
}

/**
 * Gets the default strategy settings
 */
export function getDefaultStrategySettings(): StrategySettings {
	return {
		momentum_weights: {
			three_month: 33.33,
			six_month: 33.33,
			twelve_month: 33.33,
		},
		trend_filter: {
			enabled: true,
			sma_period: 200,
		},
		selection_count: 3,
		equal_weight: true,
		volatility_targeting: {
			enabled: false,
			target_volatility: 15,
		},
		risk_free_rate: 4.5,
		rebalance_day: 1,
	};
}
