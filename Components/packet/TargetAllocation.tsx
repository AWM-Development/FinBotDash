import React from "react";
import { Card } from "@/components/ui/card";

interface Allocation {
	symbol: string;
	name: string;
	target: number;
	current: number;
}

const allocations: Allocation[] = [
	{ symbol: "QQQ", name: "Nasdaq 100", target: 33.33, current: 28.5 },
	{ symbol: "SPY", name: "S&P 500", target: 33.33, current: 35.2 },
	{ symbol: "VNQ", name: "Real Estate", target: 33.33, current: 31.1 },
];

export default function TargetAllocation() {
	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Target Allocation</h3>

			<div className="space-y-4">
				{allocations.map((item) => {
					const diff = item.target - item.current;
					return (
						<div key={item.symbol} className="space-y-2">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-slate-900">{item.symbol}</span>
									<span className="text-xs text-slate-500 ml-2">{item.name}</span>
								</div>
								<div className="text-right">
									<span className={`text-xs font-medium ${diff > 0 ? "text-emerald-600" : diff < 0 ? "text-rose-600" : "text-slate-500"
										}`}>
										{diff > 0 ? "+" : ""}{diff.toFixed(1)}%
									</span>
								</div>
							</div>

							<div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
								<div
									className="absolute h-full bg-slate-300 rounded-full"
									style={{ width: `${item.current}%` }}
								/>
								<div
									className="absolute h-full w-0.5 bg-indigo-600"
									style={{ left: `${item.target}%` }}
								/>
							</div>

							<div className="flex justify-between text-xs text-slate-500">
								<span>Current: {item.current.toFixed(1)}%</span>
								<span>Target: {item.target.toFixed(1)}%</span>
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}
