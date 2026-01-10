import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";

interface Holding {
	ticker: string;
	name: string;
	shares: number;
	value: number;
	costBasis: number;
	assetClass: "equity" | "bonds" | "real_assets" | "cash";
}

interface PieDataPoint {
	name: string;
	value: string;
	rawValue: number;
	color: string;
}

const holdings: Holding[] = [
	{ ticker: "QQQ", name: "Nasdaq 100", shares: 85, value: 43520, costBasis: 38200, assetClass: "equity" },
	{ ticker: "SPY", name: "S&P 500", shares: 92, value: 44160, costBasis: 41000, assetClass: "equity" },
	{ ticker: "VNQ", name: "Real Estate", shares: 420, value: 31080, costBasis: 32500, assetClass: "real_assets" },
	{ ticker: "SHY", name: "Short-Term Treasury", shares: 78, value: 6510, costBasis: 6400, assetClass: "cash" },
];

const assetClassColors: Record<string, string> = {
	equity: "#4f46e5",
	bonds: "#06b6d4",
	real_assets: "#f59e0b",
	cash: "#94a3b8"
};

const assetClassLabels: Record<string, string> = {
	equity: "Equities",
	bonds: "Bonds",
	real_assets: "Real Assets",
	cash: "Cash"
};

export default function Portfolio() {
	const [view, setView] = useState<"ticker" | "class">("ticker");

	const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
	const totalCostBasis = holdings.reduce((sum, h) => sum + h.costBasis, 0);
	const totalGainLoss = totalValue - totalCostBasis;

	// Calculate allocation by asset class
	const allocationByClass = holdings.reduce((acc, h) => {
		acc[h.assetClass] = (acc[h.assetClass] || 0) + h.value;
		return acc;
	}, {} as Record<string, number>);

	const pieData: PieDataPoint[] = Object.entries(allocationByClass).map(([key, value]) => ({
		name: assetClassLabels[key] || key,
		value: ((value / totalValue) * 100).toFixed(1),
		rawValue: value,
		color: assetClassColors[key] || "#94a3b8"
	}));

	const tickerPieData: PieDataPoint[] = holdings.map(h => ({
		name: h.ticker,
		value: ((h.value / totalValue) * 100).toFixed(1),
		rawValue: h.value,
		color: assetClassColors[h.assetClass]
	}));

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Portfolio</h1>
				<p className="text-sm text-slate-500 mt-1">Current holdings and exposure breakdown</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<MetricCard
					title="Total Value"
					value={`$${totalValue.toLocaleString()}`}
					trend="up"
					change="+2.4%"
					changeLabel="this month"
				/>
				<MetricCard
					title="Cash Available"
					value="$6,510"
					subtitle="5.2% of portfolio"
				/>
				<MetricCard
					title="Holdings"
					value={holdings.length.toString()}
					subtitle="4 ETFs across 3 classes"
				/>
				<MetricCard
					title="Unrealized P/L"
					value={`${totalGainLoss >= 0 ? '+' : ''}$${totalGainLoss.toLocaleString()}`}
					trend={totalGainLoss >= 0 ? "up" : "down"}
					change={`${((totalGainLoss / totalCostBasis) * 100).toFixed(1)}%`}
				/>
			</div>

			{/* Cash Banner */}
			<Card className="p-4 mb-6 bg-blue-50 border-blue-100">
				<div className="flex items-center gap-3">
					<DollarSign className="w-5 h-5 text-blue-600" />
					<div>
						<p className="text-sm font-medium text-slate-900">Cash awaiting deployment: $2,150</p>
						<p className="text-xs text-slate-600">Monthly contribution scheduled for Feb 1</p>
					</div>
				</div>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Holdings Table */}
				<div className="lg:col-span-2">
					<Card>
						<div className="p-5 border-b border-slate-200">
							<h3 className="text-sm font-semibold text-slate-900">Holdings</h3>
						</div>
						<Table>
							<TableHeader>
								<TableRow className="bg-slate-50">
									<TableHead className="font-semibold">Ticker</TableHead>
									<TableHead className="font-semibold">Name</TableHead>
									<TableHead className="font-semibold">Shares</TableHead>
									<TableHead className="font-semibold">Value</TableHead>
									<TableHead className="font-semibold">Cost Basis</TableHead>
									<TableHead className="font-semibold">Gain/Loss</TableHead>
									<TableHead className="font-semibold">Class</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{holdings.map((holding) => {
									const gainLoss = holding.value - holding.costBasis;
									const gainLossPercent = ((gainLoss / holding.costBasis) * 100).toFixed(1);
									return (
										<TableRow key={holding.ticker}>
											<TableCell className="font-semibold text-slate-900">
												{holding.ticker}
											</TableCell>
											<TableCell className="text-slate-600">{holding.name}</TableCell>
											<TableCell>{holding.shares}</TableCell>
											<TableCell className="font-medium">
												${holding.value.toLocaleString()}
											</TableCell>
											<TableCell className="text-slate-600">
												${holding.costBasis.toLocaleString()}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-1">
													{gainLoss >= 0 ? (
														<TrendingUp className="w-4 h-4 text-emerald-500" />
													) : (
														<TrendingDown className="w-4 h-4 text-rose-500" />
													)}
													<span className={gainLoss >= 0 ? "text-emerald-600" : "text-rose-600"}>
														{gainLoss >= 0 ? '+' : ''}{gainLossPercent}%
													</span>
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className="text-xs"
													style={{
														backgroundColor: `${assetClassColors[holding.assetClass]}15`,
														color: assetClassColors[holding.assetClass],
														borderColor: `${assetClassColors[holding.assetClass]}30`
													}}
												>
													{assetClassLabels[holding.assetClass]}
												</Badge>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Card>
				</div>

				{/* Allocation Charts */}
				<div className="space-y-6">
					<Card className="p-5">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-sm font-semibold text-slate-900">Allocation</h3>
							<div className="flex gap-1">
								<Button
									variant={view === "ticker" ? "secondary" : "ghost"}
									size="sm"
									className="h-7 text-xs"
									onClick={() => setView("ticker")}
								>
									By Ticker
								</Button>
								<Button
									variant={view === "class" ? "secondary" : "ghost"}
									size="sm"
									className="h-7 text-xs"
									onClick={() => setView("class")}
								>
									By Class
								</Button>
							</div>
						</div>

						<div className="h-48">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={view === "ticker" ? tickerPieData : pieData}
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={70}
										paddingAngle={2}
										dataKey="rawValue"
									>
										{(view === "ticker" ? tickerPieData : pieData).map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>

						<div className="space-y-2 mt-4">
							{(view === "ticker" ? tickerPieData : pieData).map((item, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div
											className="w-3 h-3 rounded-sm"
											style={{ backgroundColor: item.color }}
										/>
										<span className="text-sm text-slate-600">{item.name}</span>
									</div>
									<span className="text-sm font-medium text-slate-900">{item.value}%</span>
								</div>
							))}
						</div>
					</Card>

					{/* Contribution Schedule */}
					<Card className="p-5">
						<h3 className="text-sm font-semibold text-slate-900 mb-4">Contribution Schedule</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
								<div>
									<p className="text-sm font-medium text-slate-900">Monthly</p>
									<p className="text-xs text-slate-500">1st of each month</p>
								</div>
								<span className="text-sm font-semibold text-slate-900">$2,000</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-600">Next contribution</span>
								<span className="font-medium text-slate-900">Feb 1, 2026</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-600">YTD contributed</span>
								<span className="font-medium text-slate-900">$2,000</span>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
