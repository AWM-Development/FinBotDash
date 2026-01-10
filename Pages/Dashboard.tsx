import React from "react";
import TodayStatus from "@/components/dashboard/TodayStatus";
import PortfolioSnapshot from "@/components/dashboard/PortfolioSnapshot";
import PerformanceSummary from "@/components/dashboard/PerformanceSummary";
import ActionNeeded from "@/components/dashboard/ActionNeeded";
import AIBrief from "@/components/dashboard/AIBrief";

export default function Dashboard() {
	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
				<p className="text-sm text-slate-500 mt-1">Your investment overview at a glance</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<TodayStatus />
						<PortfolioSnapshot />
					</div>

					<PerformanceSummary />

					<AIBrief />
				</div>

				{/* Right Column - Actions */}
				<div className="space-y-6">
					<ActionNeeded />

					{/* Quick Stats */}
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 bg-white rounded-xl border border-slate-200">
							<p className="text-xs text-slate-500 mb-1">YTD Return</p>
							<p className="text-xl font-semibold text-emerald-600">+8.2%</p>
						</div>
						<div className="p-4 bg-white rounded-xl border border-slate-200">
							<p className="text-xs text-slate-500 mb-1">vs SPY</p>
							<p className="text-xl font-semibold text-indigo-600">+2.1%</p>
						</div>
						<div className="p-4 bg-white rounded-xl border border-slate-200">
							<p className="text-xs text-slate-500 mb-1">Max DD</p>
							<p className="text-xl font-semibold text-slate-900">-6.8%</p>
						</div>
						<div className="p-4 bg-white rounded-xl border border-slate-200">
							<p className="text-xs text-slate-500 mb-1">Sharpe</p>
							<p className="text-xl font-semibold text-slate-900">1.42</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
