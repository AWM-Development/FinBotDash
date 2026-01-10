import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";

export default function AIBrief() {
	return (
		<Card className="p-5 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-lg bg-indigo-100">
						<Sparkles className="w-4 h-4 text-indigo-600" />
					</div>
					<h3 className="text-sm font-semibold text-slate-900">AI Brief</h3>
				</div>
				<Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
					High Confidence
				</Badge>
			</div>

			<div className="space-y-4">
				<div>
					<h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
						What Changed
					</h4>
					<p className="text-sm text-slate-700 leading-relaxed">
						QQQ momentum score increased significantly (+8.5 pts) while IWM dropped below its
						200-day SMA, triggering a rotation from small-caps to large-cap growth.
						Market regime shifted from Choppy to Risk-On based on volatility compression.
					</p>
				</div>

				<div>
					<h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
						Recommended Action
					</h4>
					<div className="flex items-center gap-2 text-sm text-slate-700">
						<div className="flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-700 rounded">
							Sell IWM
						</div>
						<ArrowRight className="w-4 h-4 text-slate-400" />
						<div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
							Buy QQQ
						</div>
					</div>
				</div>

				<div className="pt-3 border-t border-indigo-100">
					<div className="flex items-start gap-2">
						<AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
						<p className="text-xs text-slate-600">
							<span className="font-medium">Risk note:</span> Tech concentration will increase
							to ~35% of equity allocation. Consider this in context of overall risk tolerance.
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
