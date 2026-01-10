import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, Shield, RefreshCw } from "lucide-react";

export default function TodayStatus({
	nextRebalance = "Feb 3, 2026",
	regime = "Choppy Risk-On",
	riskPosture = "Neutral",
	dataFreshness = "today 4:00pm ET"
}) {
	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Today's Status</h3>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-slate-600">
						<Calendar className="w-4 h-4 text-slate-400" />
						<span className="text-sm">Next rebalance</span>
					</div>
					<span className="text-sm font-medium text-slate-900">{nextRebalance}</span>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-slate-600">
						<Activity className="w-4 h-4 text-slate-400" />
						<span className="text-sm">Regime</span>
					</div>
					<Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
						{regime}
					</Badge>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-slate-600">
						<Shield className="w-4 h-4 text-slate-400" />
						<span className="text-sm">Risk posture</span>
					</div>
					<Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
						{riskPosture}
					</Badge>
				</div>

				<div className="flex items-center justify-between pt-2 border-t border-slate-100">
					<div className="flex items-center gap-2 text-slate-600">
						<RefreshCw className="w-4 h-4 text-slate-400" />
						<span className="text-sm">Prices updated</span>
					</div>
					<span className="text-xs text-slate-500">{dataFreshness}</span>
				</div>
			</div>
		</Card>
	);
}