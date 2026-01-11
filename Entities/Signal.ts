import { Regime, validateRegime } from "./Regime";

export interface Signal {
	date: string;
	strategy_id: string;
	regime: Regime;
	target_allocations: Record<string, number>;
	trade_package_id?: string;
}

/**
 * Validates a Signal object
 */
export function validateSignal(signal: unknown): signal is Signal {
	if (typeof signal !== "object" || signal === null) {
		return false;
	}

	const s = signal as Partial<Signal>;

	if (!s.date || typeof s.date !== "string") {
		return false;
	}

	if (!s.strategy_id || typeof s.strategy_id !== "string") {
		return false;
	}

	if (!s.regime || !validateRegime(s.regime)) {
		return false;
	}

	if (!s.target_allocations || typeof s.target_allocations !== "object") {
		return false;
	}

	// Validate target_allocations entries
	for (const [symbol, weight] of Object.entries(s.target_allocations)) {
		if (typeof symbol !== "string" || symbol.length === 0) {
			return false;
		}
		if (typeof weight !== "number" || weight < 0 || weight > 1) {
			return false;
		}
	}

	if (s.trade_package_id !== undefined && typeof s.trade_package_id !== "string") {
		return false;
	}

	return true;
}

/**
 * Creates a new Signal
 */
export function createSignal(
	date: string,
	strategy_id: string,
	regime: Regime,
	target_allocations: Record<string, number>,
	options?: Partial<Omit<Signal, "date" | "strategy_id" | "regime" | "target_allocations">>
): Signal {
	const signal: Signal = {
		date,
		strategy_id,
		regime,
		target_allocations,
		...options,
	};

	if (!validateSignal(signal)) {
		throw new Error("Invalid Signal data");
	}

	return signal;
}

/**
 * Gets the top allocations from a signal
 */
export function getTopAllocations(signal: Signal, count: number = 3): Array<{ symbol: string; weight: number }> {
	return Object.entries(signal.target_allocations)
		.map(([symbol, weight]) => ({ symbol, weight }))
		.sort((a, b) => b.weight - a.weight)
		.slice(0, count);
}

/**
 * Calculates total allocation weight
 */
export function getTotalAllocationWeight(signal: Signal): number {
	return Object.values(signal.target_allocations).reduce((sum, weight) => sum + weight, 0);
}
