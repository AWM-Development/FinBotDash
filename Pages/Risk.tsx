import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, TrendingUp, TrendingDown, AlertTriangle, Shield, Activity } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import DrawdownChart from "@/components/charts/DrawdownChart";

interface DrawdownDataPoint {
	date: string;
	drawdown: number;
}

interface RegimeHistoryItem {
	date: string;
	regime: string;
	volatility: number;
}

interface RiskEvent {
	date: string;
	event: string;
	severity: "warning" | "info" | "alert";
}

// Generate mock drawdown data
const generateDrawdownData = (): DrawdownDataPoint[] => {
	const data: DrawdownDataPoint[] = [];
	let peak = 100000;
	let current = 100000;
	const startDate = new Date(2024, 0, 1);

	for (let i = 0; i < 12; i++) {
		const date = new Date(startDate);
		date.setMonth(date.getMonth() + i);

		const change = (Math.random() - 0.4) * 0.05;
		current *= (1 + change);
		if (current > peak) peak = current;

		const drawdown = ((current - peak) / peak) * 100;

		data.push({
			date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
			drawdown: Math.min(0, drawdown)
		});
	}
	return data;
};

const drawdownData = generateDrawdownData();

const regimeHistory: RegimeHistoryItem[] = [
	{ date: "Jan 2026", regime: "Risk-On", volatility: 12.5 },
	{ date: "Dec 2025", regime: "Choppy", volatility: 18.2 },
	{ date: "Nov 2025", regime: "Choppy", volatility: 16.8 },
	{ date: "Oct 2025", regime: "Risk-On", volatility: 14.2 },
	{ date: "Sep 2025", regime: "Risk-Off", volatility: 22.5 },
];

const riskEvents: RiskEvent[] = [
	{ date: "Dec 15, 2025", event: "Volatility spike detected; exposure scaled to 85%", severity: "warning" },
	{ date: "Nov 28, 2025", event: "Regime shifted from Risk-On to Choppy", severity: "info" },
	{ date: "Sep 20, 2025", event: "Max drawdown threshold triggered defensive mode", severity: "alert" },
];

export default function Risk() {
	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Risk</h1>
				<p className="text-sm text-slate-500 mt-1">Risk controls and stability metrics</p>
			</div>

			{/* Current Risk Status */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<MetricCard
					title="Current Drawdown"
					value="-2.1%"
					subtitle="From peak"
				/>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<MetricCard
									title="Current Volatility"
									value="12.5%"
									subtitle="30-day annualized"
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs">Target volatility: 15%. Currently below target.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<MetricCard
					title="Risk Posture"
					value="Risk-On"
					subtitle="Full allocation"
				/>
				<MetricCard
					title="Exposure"
					value="100%"
					subtitle="Target equity"
				/>
			</div>

			{/* Drawdown Chart */}
			<Card className="p-6 mb-8">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-2">
						<h3 className="text-sm font-semibold text-slate-900">Underwater Plot</h3>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Info className="w-4 h-4 text-slate-400" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs max-w-48">Shows how far below the all-time high the portfolio has been over time.</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span className="text-slate-600">Max Drawdown:</span>
						<Badge className="bg-rose-100 text-rose-700">-8.4%</Badge>
					</div>
				</div>
				<DrawdownChart data={drawdownData} height={250} />
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Volatility Comparison */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Volatility vs Target</h3>

					<div className="space-y-6">
						<div>
							<div className="flex justify-between text-sm mb-2">
								<span className="text-slate-600">Current Volatility</span>
								<span className="font-medium text-slate-900">12.5%</span>
							</div>
							<div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
								<div className="h-full bg-indigo-500 rounded-full" style={{ width: "62.5%" }}></div>
								<div
									className="absolute top-0 bottom-0 w-0.5 bg-slate-400"
									style={{ left: "75%" }}
								/>
							</div>
							<div className="flex justify-between text-xs text-slate-500 mt-1">
								<span>0%</span>
								<span>Target: 15%</span>
								<span>20%</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-slate-50 rounded-lg">
								<p className="text-xs text-slate-500 mb-1">30-Day Realized</p>
								<p className="text-lg font-semibold text-slate-900">12.5%</p>
							</div>
							<div className="p-4 bg-slate-50 rounded-lg">
								<p className="text-xs text-slate-500 mb-1">Historical Avg</p>
								<p className="text-lg font-semibold text-slate-900">14.2%</p>
							</div>
						</div>
					</div>
				</Card>

				{/* Exposure Summary */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Exposure Summary</h3>

					<div className="space-y-4">
						<div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
							<div className="flex items-center gap-2">
								<TrendingUp className="w-4 h-4 text-indigo-600" />
								<span className="text-sm text-slate-700">Equity Exposure</span>
							</div>
							<span className="text-sm font-semibold text-slate-900">94.8%</span>
						</div>

						<div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
							<div className="flex items-center gap-2">
								<Shield className="w-4 h-4 text-cyan-600" />
								<span className="text-sm text-slate-700">Duration Risk (Bonds)</span>
							</div>
							<span className="text-sm font-semibold text-slate-900">0%</span>
						</div>

						<div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
							<div className="flex items-center gap-2">
								<Activity className="w-4 h-4 text-amber-600" />
								<span className="text-sm text-slate-700">Real Assets</span>
							</div>
							<span className="text-sm font-semibold text-slate-900">5.2%</span>
						</div>
					</div>
				</Card>

				{/* Regime Timeline */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Regime Timeline</h3>

					<div className="space-y-3">
						{regimeHistory.map((item, index) => (
							<div
								key={index}
								className={`flex items-center justify-between p-3 rounded-lg ${item.regime === "Risk-On"
									? "bg-emerald-50"
									: item.regime === "Risk-Off"
										? "bg-rose-50"
										: "bg-amber-50"
									}`}
							>
								<div className="flex items-center gap-3">
									<span className="text-sm font-medium text-slate-900">{item.date}</span>
									<Badge
										className={
											item.regime === "Risk-On"
												? "bg-emerald-100 text-emerald-700"
												: item.regime === "Risk-Off"
													? "bg-rose-100 text-rose-700"
													: "bg-amber-100 text-amber-700"
										}
									>
										{item.regime}
									</Badge>
								</div>
								<span className="text-sm text-slate-600">Vol: {item.volatility}%</span>
							</div>
						))}
					</div>
				</Card>

				{/* Risk Events Feed */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Risk Events</h3>

					<div className="space-y-4">
						{riskEvents.map((event, index) => (
							<div key={index} className="flex gap-3">
								<div className={`p-2 rounded-lg shrink-0 ${event.severity === "alert"
									? "bg-rose-100"
									: event.severity === "warning"
										? "bg-amber-100"
										: "bg-blue-100"
									}`}>
									{event.severity === "alert" ? (
										<TrendingDown className="w-4 h-4 text-rose-600" />
									) : event.severity === "warning" ? (
										<AlertTriangle className="w-4 h-4 text-amber-600" />
									) : (
										<Activity className="w-4 h-4 text-blue-600" />
									)}
								</div>
								<div>
									<p className="text-sm text-slate-900">{event.event}</p>
									<p className="text-xs text-slate-500 mt-1">{event.date}</p>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
