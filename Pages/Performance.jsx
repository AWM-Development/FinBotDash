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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import EquityCurve from "@/components/charts/EquityCurve";

// Generate mock equity curve data
const generateEquityData = () => {
	const data = [];
	let portfolioValue = 100000;
	let benchmarkValue = 100000;
	const startDate = new Date(2022, 0, 1);

	for (let i = 0; i < 36; i++) {
		const date = new Date(startDate);
		date.setMonth(date.getMonth() + i);

		const portfolioReturn = (Math.random() - 0.45) * 0.08;
		const benchmarkReturn = (Math.random() - 0.48) * 0.07;

		portfolioValue *= (1 + portfolioReturn);
		benchmarkValue *= (1 + benchmarkReturn);

		data.push({
			date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
			portfolio: Math.round(portfolioValue),
			benchmark: Math.round(benchmarkValue)
		});
	}
	return data;
};

const equityData = generateEquityData();

// Calendar returns mock data
const calendarReturns = {
	2024: { Jan: 2.1, Feb: 1.8, Mar: -0.5, Apr: 3.2, May: 1.4, Jun: -1.2, Jul: 2.8, Aug: -0.8, Sep: 1.5, Oct: 2.1, Nov: 3.4, Dec: 1.9 },
	2025: { Jan: 2.4, Feb: null, Mar: null, Apr: null, May: null, Jun: null, Jul: null, Aug: null, Sep: null, Oct: null, Nov: null, Dec: null }
};

const worstMonths = [
	{ date: "Jun 2024", return: -1.2, benchmark: -0.8 },
	{ date: "Aug 2024", return: -0.8, benchmark: -1.5 },
	{ date: "Mar 2024", return: -0.5, benchmark: -0.3 },
];

export default function Performance() {
	const [benchmark, setBenchmark] = useState("SPY");
	const [taxView, setTaxView] = useState("pre-tax");

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
				<div>
					<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Performance</h1>
					<p className="text-sm text-slate-500 mt-1">Deep performance analysis and metrics</p>
				</div>
				<div className="flex gap-3">
					<Select value={benchmark} onValueChange={setBenchmark}>
						<SelectTrigger className="w-32">
							<SelectValue placeholder="Benchmark" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="SPY">vs SPY</SelectItem>
							<SelectItem value="VTI">vs VTI</SelectItem>
							<SelectItem value="60-40">vs 60/40</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex border rounded-lg overflow-hidden">
						<Button
							variant={taxView === "pre-tax" ? "secondary" : "ghost"}
							size="sm"
							className="rounded-none"
							onClick={() => setTaxView("pre-tax")}
						>
							Pre-Tax
						</Button>
						<Button
							variant={taxView === "after-tax" ? "secondary" : "ghost"}
							size="sm"
							className="rounded-none"
							onClick={() => setTaxView("after-tax")}
						>
							After-Tax
						</Button>
					</div>
				</div>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
				<MetricCard
					title="CAGR"
					value="12.4%"
					trend="up"
					change="+2.1%"
					changeLabel={`vs ${benchmark}`}
				/>
				<MetricCard
					title="Volatility"
					value="11.2%"
					subtitle="Annualized"
				/>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<MetricCard
									title="Sharpe Ratio"
									value="1.42"
									subtitle="Risk-adjusted"
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs">Return per unit of risk, higher is better. Above 1.0 is good.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<MetricCard
									title="Max Drawdown"
									value="-8.4%"
									subtitle="Peak to trough"
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs">Largest drop from peak. Lower magnitude is better.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<MetricCard
					title="Win Rate"
					value="67%"
					subtitle="Months positive"
				/>
			</div>

			{/* Equity Curve */}
			<Card className="p-6 mb-8">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-sm font-semibold text-slate-900">Equity Curve</h3>
					<div className="flex items-center gap-4 text-sm">
						<div className="flex items-center gap-2">
							<div className="w-3 h-1 bg-indigo-500 rounded"></div>
							<span className="text-slate-600">Strategy</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-1 bg-slate-400 rounded" style={{ borderStyle: "dashed" }}></div>
							<span className="text-slate-600">{benchmark}</span>
						</div>
					</div>
				</div>
				<EquityCurve data={equityData} showBenchmark={true} height={350} />
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Calendar Returns Heatmap */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Calendar Returns</h3>
					<div className="overflow-x-auto">
						<table className="w-full text-xs">
							<thead>
								<tr>
									<th className="text-left py-2 text-slate-500 font-medium">Year</th>
									{months.map(month => (
										<th key={month} className="text-center py-2 text-slate-500 font-medium w-10">
											{month}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{Object.entries(calendarReturns).map(([year, returns]) => (
									<tr key={year}>
										<td className="py-1 font-medium text-slate-900">{year}</td>
										{months.map(month => {
											const value = returns[month];
											const bgColor = value === null
												? "bg-slate-50"
												: value >= 2
													? "bg-emerald-200"
													: value > 0
														? "bg-emerald-100"
														: value > -1
															? "bg-rose-100"
															: "bg-rose-200";
											return (
												<td key={month} className="p-1 text-center">
													<div className={`rounded py-1 ${bgColor}`}>
														{value !== null ? `${value > 0 ? '+' : ''}${value}%` : '-'}
													</div>
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>

				{/* Worst Months */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Worst Months</h3>
					<div className="space-y-3">
						{worstMonths.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
							>
								<div>
									<p className="text-sm font-medium text-slate-900">{item.date}</p>
									<p className="text-xs text-slate-500">{benchmark}: {item.benchmark}%</p>
								</div>
								<Badge className="bg-rose-100 text-rose-700 border-rose-200">
									{item.return}%
								</Badge>
							</div>
						))}
					</div>
					<div className="mt-4 p-3 bg-indigo-50 rounded-lg">
						<div className="flex items-start gap-2">
							<Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
							<p className="text-xs text-slate-600">
								Strategy outperformed benchmark in 2 of 3 worst months, demonstrating
								downside protection from the trend-following rules.
							</p>
						</div>
					</div>
				</Card>

				{/* Additional Metrics */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Additional Metrics</h3>
					<div className="space-y-3">
						<div className="flex justify-between py-2 border-b border-slate-100">
							<span className="text-sm text-slate-600">Sortino Ratio</span>
							<span className="text-sm font-medium text-slate-900">1.85</span>
						</div>
						<div className="flex justify-between py-2 border-b border-slate-100">
							<span className="text-sm text-slate-600">Calmar Ratio</span>
							<span className="text-sm font-medium text-slate-900">1.48</span>
						</div>
						<div className="flex justify-between py-2 border-b border-slate-100">
							<span className="text-sm text-slate-600">Max Drawdown Duration</span>
							<span className="text-sm font-medium text-slate-900">45 days</span>
						</div>
						<div className="flex justify-between py-2 border-b border-slate-100">
							<span className="text-sm text-slate-600">Average Monthly Return</span>
							<span className="text-sm font-medium text-slate-900">+1.0%</span>
						</div>
						<div className="flex justify-between py-2">
							<span className="text-sm text-slate-600">Best Month</span>
							<span className="text-sm font-medium text-emerald-600">+3.4%</span>
						</div>
					</div>
				</Card>

				{/* Rolling Returns */}
				<Card className="p-6">
					<h3 className="text-sm font-semibold text-slate-900 mb-4">Rolling 1-Year Returns</h3>
					<div className="space-y-4">
						<div>
							<div className="flex justify-between text-sm mb-1">
								<span className="text-slate-600">Current</span>
								<span className="font-medium text-emerald-600">+12.5%</span>
							</div>
							<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
								<div className="h-full bg-emerald-500 rounded-full" style={{ width: "62%" }}></div>
							</div>
						</div>
						<div>
							<div className="flex justify-between text-sm mb-1">
								<span className="text-slate-600">Average</span>
								<span className="font-medium text-slate-900">+10.2%</span>
							</div>
							<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
								<div className="h-full bg-indigo-500 rounded-full" style={{ width: "51%" }}></div>
							</div>
						</div>
						<div>
							<div className="flex justify-between text-sm mb-1">
								<span className="text-slate-600">Minimum</span>
								<span className="font-medium text-rose-600">-2.1%</span>
							</div>
							<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
								<div className="h-full bg-rose-500 rounded-full" style={{ width: "10%" }}></div>
							</div>
						</div>
						<div>
							<div className="flex justify-between text-sm mb-1">
								<span className="text-slate-600">Maximum</span>
								<span className="font-medium text-emerald-600">+18.5%</span>
							</div>
							<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
								<div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }}></div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}