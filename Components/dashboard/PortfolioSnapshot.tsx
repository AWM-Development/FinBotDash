import React from "react";
import { Card } from "@/components/ui/card";
import AllocationDonut from "@/components/charts/AllocationDonut";

interface AllocationData {
	equity?: number;
	bonds?: number;
	real_assets?: number;
	cash?: number;
	[key: string]: number | undefined;
}

interface PortfolioSnapshotProps {
	totalValue?: number;
	cashPercent?: number;
	holdingsCount?: number;
	allocation?: AllocationData;
}

export default function PortfolioSnapshot({
	totalValue = 125420,
	cashPercent = 5.2,
	holdingsCount = 4,
	allocation = { equity: 62.5, bonds: 25.3, real_assets: 7.0, cash: 5.2 }
}: PortfolioSnapshotProps) {
	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Portfolio Snapshot</h3>

			<div className="grid grid-cols-3 gap-4 mb-6">
				<div>
					<p className="text-xs text-slate-500 mb-1">Total Value</p>
					<p className="text-xl font-semibold text-slate-900">
						${totalValue.toLocaleString()}
					</p>
				</div>
				<div>
					<p className="text-xs text-slate-500 mb-1">Cash</p>
					<p className="text-xl font-semibold text-slate-900">{cashPercent}%</p>
				</div>
				<div>
					<p className="text-xs text-slate-500 mb-1">Holdings</p>
					<p className="text-xl font-semibold text-slate-900">{holdingsCount}</p>
				</div>
			</div>

			<AllocationDonut data={allocation} size={140} />
		</Card>
	);
}
