export interface Regime {
	id?: string;
	date: string;
	strategy_id: string;
	regime_label: string;
	confidence: number;
	rationale?: Record<string, unknown>;
}

/**
 * Validates a Regime object
 */
export function validateRegime(regime: unknown): regime is Regime {
	if (typeof regime !== "object" || regime === null) {
		return false;
	}

	const r = regime as Partial<Regime>;

	if (!r.date || typeof r.date !== "string") {
		return false;
	}

	if (!r.strategy_id || typeof r.strategy_id !== "string") {
		return false;
	}

	if (!r.regime_label || typeof r.regime_label !== "string") {
		return false;
	}

	if (typeof r.confidence !== "number" || r.confidence < 0 || r.confidence > 1) {
		return false;
	}

	if (r.rationale !== undefined && (typeof r.rationale !== "object" || r.rationale === null)) {
		return false;
	}

	return true;
}

/**
 * Creates a new Regime
 */
export function createRegime(
	date: string,
	strategy_id: string,
	regime_label: string,
	confidence: number,
	options?: Partial<Omit<Regime, "date" | "strategy_id" | "regime_label" | "confidence">>
): Regime {
	const regime: Regime = {
		date,
		strategy_id,
		regime_label,
		confidence,
		...options,
	};

	if (!validateRegime(regime)) {
		throw new Error("Invalid Regime data");
	}

	return regime;
}

/**
 * Known regime labels
 */
export const REGIME_LABELS = {
	TRENDING_RISK_ON: "TRENDING_RISK_ON",
	CHOPPY_RISK_ON: "CHOPPY_RISK_ON",
	RISK_OFF: "RISK_OFF",
	TRANSITIONAL: "TRANSITIONAL",
	DEFENSIVE: "DEFENSIVE",
} as const;

export type RegimeLabel = (typeof REGIME_LABELS)[keyof typeof REGIME_LABELS];
