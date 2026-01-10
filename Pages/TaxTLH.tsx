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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DollarSign,
	AlertTriangle,
	Info,
	Plus,
	CheckCircle,
	Calendar,
	TrendingUp,
	TrendingDown,
	type LucideIcon
} from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import EmptyState from "@/components/shared/EmptyState";

interface TLHOpportunity {
	id: number;
	ticker: string;
	unrealizedLoss: number;
	replacement: string;
	estimatedSavings: number;
	status: "available" | "added";
}

interface WashSaleRestriction {
	ticker: string;
	soldDate: string;
	endDate: string;
	daysRemaining: number;
}

interface RealizedGainsLosses {
	shortTerm: number;
	longTerm: number;
	net: number;
}

interface HoldingsBreakdown {
	ticker: string;
	value: number;
	shortTerm: number;
	longTerm: number;
}

const tlhOpportunities: TLHOpportunity[] = [
	{
		id: 1,
		ticker: "VTI",
		unrealizedLoss: -1240,
		replacement: "ITOT",
		estimatedSavings: 340,
		status: "available"
	},
];

const washSaleRestrictions: WashSaleRestriction[] = [
	{ ticker: "SPY", soldDate: "Jan 15, 2026", endDate: "Feb 14, 2026", daysRemaining: 17 },
];

const realizedGainsLosses: Record<string, RealizedGainsLosses> = {
	2025: { shortTerm: 850, longTerm: -420, net: 430 },
	2024: { shortTerm: 1200, longTerm: 3500, net: 4700 },
};

const holdingsBreakdown: HoldingsBreakdown[] = [
	{ ticker: "QQQ", value: 43520, shortTerm: 15200, longTerm: 28320 },
	{ ticker: "SPY", value: 44160, shortTerm: 8500, longTerm: 35660 },
	{ ticker: "VNQ", value: 31080, shortTerm: 31080, longTerm: 0 },
];

export default function TaxTLH() {
	const [opportunities, setOpportunities] = useState<TLHOpportunity[]>(tlhOpportunities);

	const addToPacket = (id: number) => {
		setOpportunities(prev =>
			prev.map(op => op.id === id ? { ...op, status: "added" as const } : op)
		);
	};

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Tax & TLH</h1>
				<p className="text-sm text-slate-500 mt-1">Tax optimization and loss harvesting opportunities</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<MetricCard
					title="YTD Realized"
					value="+$430"
					trend="up"
					subtitle="Net gain"
				/>
				<MetricCard
					title="TLH Available"
					value="$1,240"
					subtitle="1 opportunity"
				/>
				<MetricCard
					title="Est. Tax Savings"
					value="~$340"
					subtitle="At 28% bracket"
				/>
				<MetricCard
					title="Wash Sale Risks"
					value="1"
					subtitle="Active restrictions"
				/>
			</div>

			{/* TLH Opportunities */}
			<Card className="mb-8">
				<div className="p-5 border-b border-slate-200">
					<div className="flex items-center gap-2">
						<DollarSign className="w-5 h-5 text-emerald-600" />
						<h3 className="text-sm font-semibold text-slate-900">TLH Opportunities</h3>
					</div>
					<p className="text-xs text-slate-500 mt-1">Tax-loss harvesting candidates for this month</p>
				</div>

				{opportunities.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow className="bg-slate-50">
								<TableHead className="font-semibold">Ticker</TableHead>
								<TableHead className="font-semibold">Unrealized Loss</TableHead>
								<TableHead className="font-semibold">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="flex items-center gap-1">
												Replacement
												<Info className="w-3.5 h-3.5 text-slate-400" />
											</TooltipTrigger>
											<TooltipContent>
												<p className="text-xs">Wash-sale safe substitute ETF</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</TableHead>
								<TableHead className="font-semibold">Est. Savings</TableHead>
								<TableHead className="font-semibold">Status</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{opportunities.map((op) => (
								<TableRow key={op.id}>
									<TableCell className="font-semibold text-slate-900">{op.ticker}</TableCell>
									<TableCell className="text-rose-600 font-medium">
										${Math.abs(op.unrealizedLoss).toLocaleString()}
									</TableCell>
									<TableCell>
										<Badge variant="outline" className="bg-slate-50">
											{op.replacement}
										</Badge>
									</TableCell>
									<TableCell className="text-emerald-600 font-medium">
										~${op.estimatedSavings}
									</TableCell>
									<TableCell>
										{op.status === "added" ? (
											<Badge className="bg-emerald-100 text-emerald-700 gap-1">
												<CheckCircle className="w-3 h-3" />
												Added
											</Badge>
										) : (
											<Badge className="bg-amber-100 text-amber-700">Available</Badge>
										)}
									</TableCell>
									<TableCell>
										{op.status !== "added" && (
											<Button
												size="sm"
												variant="outline"
												className="gap-1"
												onClick={() => addToPacket(op.id)}
											>
												<Plus className="w-3.5 h-3.5" />
												Add to Packet
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className="p-6">
						<EmptyState
							title="No TLH opportunities"
							description="There are no tax-loss harvesting opportunities this month."
							icon={DollarSign}
						/>
					</div>
				)}
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Wash Sale Calendar */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-4">
						<AlertTriangle className="w-5 h-5 text-amber-600" />
						<h3 className="text-sm font-semibold text-slate-900">Wash Sale Restrictions</h3>
					</div>

					{washSaleRestrictions.length > 0 ? (
						<div className="space-y-4">
							{washSaleRestrictions.map((restriction, index) => (
								<div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-100">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-semibold text-slate-900">{restriction.ticker}</span>
										<Badge className="bg-amber-100 text-amber-700">
											{restriction.daysRemaining} days left
										</Badge>
									</div>
									<div className="flex items-center gap-2 text-sm text-slate-600">
										<Calendar className="w-4 h-4 text-slate-400" />
										<span>Sold: {restriction.soldDate}</span>
										<span className="text-slate-300">→</span>
										<span>Can repurchase: {restriction.endDate}</span>
									</div>
									<div className="mt-3 h-2 bg-amber-200 rounded-full overflow-hidden">
										<div
											className="h-full bg-amber-500 rounded-full"
											style={{ width: `${((30 - restriction.daysRemaining) / 30) * 100}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					) : (
						<EmptyState
							title="No wash sale restrictions"
							description="You can freely trade all holdings."
							icon={CheckCircle}
						/>
					)}
				</Card>

				{/* Realized Gains/Losses */}
				<Card className="p-5">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Realized Gains/Losses</h3>

					<div className="space-y-4">
						{Object.entries(realizedGainsLosses).map(([year, data]) => (
							<div key={year} className="p-4 bg-slate-50 rounded-lg">
								<div className="flex items-center justify-between mb-3">
									<span className="text-sm font-semibold text-slate-900">{year}</span>
									<span className={`text-sm font-semibold ${data.net >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
										Net: {data.net >= 0 ? "+" : ""}${data.net.toLocaleString()}
									</span>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center gap-2">
										<TrendingUp className="w-4 h-4 text-rose-500" />
										<div>
											<p className="text-xs text-slate-500">Short-term</p>
											<p className="text-sm font-medium text-slate-900">
												${data.shortTerm.toLocaleString()}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<TrendingDown className="w-4 h-4 text-emerald-500" />
										<div>
											<p className="text-xs text-slate-500">Long-term</p>
											<p className="text-sm font-medium text-slate-900">
												${data.longTerm.toLocaleString()}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Tax Posture */}
			<Card className="p-5">
				<div className="flex items-center gap-2 mb-4">
					<Info className="w-5 h-5 text-indigo-600" />
					<h3 className="text-sm font-semibold text-slate-900">Tax Posture</h3>
				</div>
				<p className="text-sm text-slate-600 mb-4">
					Holdings breakdown by tax lot holding period
				</p>

				<Table>
					<TableHeader>
						<TableRow className="bg-slate-50">
							<TableHead className="font-semibold">Ticker</TableHead>
							<TableHead className="font-semibold">Total Value</TableHead>
							<TableHead className="font-semibold">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1">
											Short-Term
											<Info className="w-3.5 h-3.5 text-slate-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-xs">Held less than 1 year, taxed at ordinary income rates</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableHead>
							<TableHead className="font-semibold">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1">
											Long-Term
											<Info className="w-3.5 h-3.5 text-slate-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-xs">Held more than 1 year, taxed at capital gains rates</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{holdingsBreakdown.map((holding) => (
							<TableRow key={holding.ticker}>
								<TableCell className="font-semibold text-slate-900">{holding.ticker}</TableCell>
								<TableCell>${holding.value.toLocaleString()}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span>${holding.shortTerm.toLocaleString()}</span>
										<span className="text-xs text-slate-400">
											({((holding.shortTerm / holding.value) * 100).toFixed(0)}%)
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span>${holding.longTerm.toLocaleString()}</span>
										<span className="text-xs text-slate-400">
											({((holding.longTerm / holding.value) * 100).toFixed(0)}%)
										</span>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
