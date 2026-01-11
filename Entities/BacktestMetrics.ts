export interface BacktestMetrics {
	run_id: string;
	strategy_id: string;
	start_date: string;
	end_date: string;
	cagr: number;
	total_return: number;
	volatility: number;
	sharpe_ratio: number | null;
	sortino_ratio: number | null;
	max_drawdown: number;
	max_drawdown_duration_days: number | null;
	peak_date?: string;
	trough_date?: string;
	recovery_date?: string;
	final_value: number;
	initial_value: number;
}

export interface EquityCurvePoint {
	date: string;
	value: number;
}

export interface BacktestTrade {
	date: string;
	symbol: string;
	action: "BUY" | "SELL";
	shares: number;
	price: number;
	amount: number;
}

export interface BacktestEvent {
	date: string;
	allocations: Record<string, number>;
	reasoning?: unknown;
}

export interface BacktestArtifacts {
	equity_curve: EquityCurvePoint[];
	trades: BacktestTrade[];
	events: BacktestEvent[];
}

/**
 * Validates a BacktestMetrics object
 */
export function validateBacktestMetrics(metrics: unknown): metrics is BacktestMetrics {
	if (typeof metrics !== "object" || metrics === null) {
		return false;
	}

	const m = metrics as Partial<BacktestMetrics>;

	if (!m.run_id || typeof m.run_id !== "string") {
		return false;
	}

	if (!m.strategy_id || typeof m.strategy_id !== "string") {
		return false;
	}

	if (!m.start_date || typeof m.start_date !== "string") {
		return false;
	}

	if (!m.end_date || typeof m.end_date !== "string") {
		return false;
	}

	if (typeof m.cagr !== "number") {
		return false;
	}

	if (typeof m.total_return !== "number") {
		return false;
	}

	if (typeof m.volatility !== "number") {
		return false;
	}

	if (typeof m.max_drawdown !== "number") {
		return false;
	}

	if (typeof m.final_value !== "number" || m.final_value < 0) {
		return false;
	}

	if (typeof m.initial_value !== "number" || m.initial_value <= 0) {
		return false;
	}

	return true;
}

/**
 * Validates a BacktestArtifacts object
 */
export function validateBacktestArtifacts(artifacts: unknown): artifacts is BacktestArtifacts {
	if (typeof artifacts !== "object" || artifacts === null) {
		return false;
	}

	const a = artifacts as Partial<BacktestArtifacts>;

	if (!Array.isArray(a.equity_curve)) {
		return false;
	}

	for (const point of a.equity_curve) {
		if (!point.date || typeof point.date !== "string") {
			return false;
		}
		if (typeof point.value !== "number") {
			return false;
		}
	}

	if (!Array.isArray(a.trades)) {
		return false;
	}

	for (const trade of a.trades) {
		if (!trade.date || typeof trade.date !== "string") {
			return false;
		}
		if (!trade.symbol || typeof trade.symbol !== "string") {
			return false;
		}
		if (trade.action !== "BUY" && trade.action !== "SELL") {
			return false;
		}
		if (typeof trade.shares !== "number" || trade.shares <= 0) {
			return false;
		}
		if (typeof trade.price !== "number" || trade.price <= 0) {
			return false;
		}
		if (typeof trade.amount !== "number") {
			return false;
		}
	}

	if (!Array.isArray(a.events)) {
		return false;
	}

	return true;
}

/**
 * Calculates profit from backtest metrics
 */
export function calculateProfit(metrics: BacktestMetrics): number {
	return metrics.final_value - metrics.initial_value;
}

/**
 * Formats percentage return for display
 */
export function formatReturn(value: number): string {
	const percentage = value * 100;
	const sign = percentage >= 0 ? "+" : "";
	return `${sign}${percentage.toFixed(2)}%`;
}

/**
 * Gets the duration of the backtest in days
 */
export function getBacktestDurationDays(metrics: BacktestMetrics): number {
	const start = new Date(metrics.start_date);
	const end = new Date(metrics.end_date);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
