import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, CheckCircle, XCircle, Star, TrendingUp, TrendingDown } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

const signalsData = [
	{ ticker: "SPY", name: "S&P 500", assetClass: "equity", momentum: 8.5, trend: "above", eligible: true, rank: 2, selected: true },
	{ ticker: "QQQ", name: "Nasdaq 100", assetClass: "equity", momentum: 9.2, trend: "above", eligible: true, rank: 1, selected: true },
	{ ticker: "IWM", name: "Russell 2000", assetClass: "equity", momentum: 4.1, trend: "below", eligible: false, rank: 6, selected: false },
	{ ticker: "EFA", name: "Intl Developed", assetClass: "equity", momentum: 5.8, trend: "above", eligible: true, rank: 4, selected: false },
	{ ticker: "VNQ", name: "Real Estate", assetClass: "real_assets", momentum: 6.2, trend: "above", eligible: true, rank: 3, selected: true },
	{ ticker: "TLT", name: "Long-Term Treasury", assetClass: "bonds", momentum: 3.2, trend: "below", eligible: false, rank: 7, selected: false },
	{ ticker: "IEF", name: "Intermediate Treasury", assetClass: "bonds", momentum: 4.8, trend: "above", eligible: true, rank: 5, selected: false },
	{ ticker: "SHY", name: "Short-Term Treasury", assetClass: "cash", momentum: 1.5, trend: "above", eligible: true, rank: 8, selected: false },
];

const signalHistory = [
	{ month: "Jan 2026", selections: ["QQQ", "SPY", "VNQ"], regime: "Risk-On", change: "IWM → QQQ" },
	{ month: "Dec 2025", selections: ["SPY", "IWM", "VNQ"], regime: "Choppy", change: null },
	{ month: "Nov 2025", selections: ["SPY", "IWM", "VNQ"], regime: "Choppy", change: "EFA → IWM" },
	{ month: "Oct 2025", selections: ["SPY", "EFA", "VNQ"], regime: "Risk-On", change: null },
];

export default function Signals() {
	const [filter, setFilter] = useState("all");
	const [assetClassFilter, setAssetClassFilter] = useState("all");

	const filteredSignals = signalsData.filter(signal => {
		if (filter === "eligible" && !signal.eligible) return false;
		if (filter === "selected" && !signal.selected) return false;
		if (assetClassFilter !== "all" && signal.assetClass !== assetClassFilter) return false;
		return true;
	});

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Signals</h1>
				<p className="text-sm text-slate-500 mt-1">Strategy recommendations and rankings</p>
			</div>

			{/* Explainer Panel */}
			<Card className="p-5 bg-indigo-50 border-indigo-100 mb-6">
				<div className="flex items-start gap-3">
					<Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
					<div>
						<h3 className="text-sm font-semibold text-slate-900 mb-1">How Signals Work</h3>
						<p className="text-sm text-slate-600 leading-relaxed">
							Each ETF is scored using a blended momentum formula (3/6/12 month returns).
							ETFs must also trade above their 200-day Simple Moving Average (SMA) to be eligible.
							The top 3 eligible ETFs are selected for the portfolio each month.
						</p>
					</div>
				</div>
			</Card>

			{/* Filters */}
			<div className="flex flex-wrap gap-3 mb-6">
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All ETFs</SelectItem>
						<SelectItem value="eligible">Eligible Only</SelectItem>
						<SelectItem value="selected">Selected Only</SelectItem>
					</SelectContent>
				</Select>

				<Select value={assetClassFilter} onValueChange={setAssetClassFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Asset Class" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Classes</SelectItem>
						<SelectItem value="equity">Equity</SelectItem>
						<SelectItem value="bonds">Bonds</SelectItem>
						<SelectItem value="real_assets">Real Assets</SelectItem>
						<SelectItem value="cash">Cash</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Signals Table */}
			<Card className="mb-8">
				<Table>
					<TableHeader>
						<TableRow className="bg-slate-50">
							<TableHead className="font-semibold">Ticker</TableHead>
							<TableHead className="font-semibold">Name</TableHead>
							<TableHead className="font-semibold">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1">
											Momentum
											<Info className="w-3.5 h-3.5 text-slate-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-xs">Blended 3/6/12 month momentum score</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableHead>
							<TableHead className="font-semibold">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1">
											Trend Filter
											<Info className="w-3.5 h-3.5 text-slate-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-xs">Position relative to 200-day SMA</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableHead>
							<TableHead className="font-semibold">Eligible</TableHead>
							<TableHead className="font-semibold">Rank</TableHead>
							<TableHead className="font-semibold">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredSignals.map((signal) => (
							<TableRow key={signal.ticker} className={signal.selected ? "bg-indigo-50/50" : ""}>
								<TableCell className="font-semibold text-slate-900">
									{signal.ticker}
								</TableCell>
								<TableCell className="text-slate-600">{signal.name}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
											<div
												className="h-full bg-indigo-500 rounded-full"
												style={{ width: `${signal.momentum * 10}%` }}
											/>
										</div>
										<span className="text-sm font-medium text-slate-700">{signal.momentum}</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-1.5">
										{signal.trend === "above" ? (
											<>
												<TrendingUp className="w-4 h-4 text-emerald-500" />
												<span className="text-sm text-emerald-700">Above</span>
											</>
										) : (
											<>
												<TrendingDown className="w-4 h-4 text-rose-500" />
												<span className="text-sm text-rose-700">Below</span>
											</>
										)}
									</div>
								</TableCell>
								<TableCell>
									{signal.eligible ? (
										<CheckCircle className="w-5 h-5 text-emerald-500" />
									) : (
										<XCircle className="w-5 h-5 text-slate-300" />
									)}
								</TableCell>
								<TableCell>
									<span className={`text-sm font-medium ${signal.rank <= 3 ? "text-indigo-600" : "text-slate-500"}`}>
										#{signal.rank}
									</span>
								</TableCell>
								<TableCell>
									{signal.selected && (
										<Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 gap-1">
											<Star className="w-3 h-3" />
											Selected
										</Badge>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>

			{/* Signal History */}
			<h2 className="text-lg font-semibold text-slate-900 mb-4">Signal History</h2>
			<Card className="p-5">
				<div className="space-y-4">
					{signalHistory.map((item, index) => (
						<div
							key={item.month}
							className={`flex items-center gap-4 ${index !== signalHistory.length - 1 ? "pb-4 border-b border-slate-100" : ""}`}
						>
							<div className="w-24 shrink-0">
								<p className="text-sm font-medium text-slate-900">{item.month}</p>
							</div>
							<div className="flex gap-2">
								{item.selections.map((ticker) => (
									<Badge key={ticker} variant="outline" className="bg-slate-50">
										{ticker}
									</Badge>
								))}
							</div>
							<StatusBadge status={item.regime.toLowerCase().replace(" ", "-")} />
							{item.change && (
								<span className="text-xs text-slate-500 ml-auto">
									Rotation: {item.change}
								</span>
							)}
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}