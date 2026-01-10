import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, AlertCircle, RefreshCw, Zap } from "lucide-react";

export default function AIExplanation() {
	return (
		<Card className="p-5 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
			<div className="flex items-center gap-2 mb-4">
				<Sparkles className="w-5 h-5 text-indigo-600" />
				<h3 className="text-sm font-semibold text-slate-900">AI Explanation</h3>
			</div>

			<div className="space-y-4">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<Zap className="w-4 h-4 text-indigo-500" />
						<h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
							Why These Holdings
						</h4>
					</div>
					<p className="text-sm text-slate-600 leading-relaxed">
						QQQ leads due to strong tech momentum and breadth improvement. SPY provides
						diversified large-cap exposure with solid fundamentals. VNQ adds real asset
						diversification as rates stabilize and REITs show relative strength.
					</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<RefreshCw className="w-4 h-4 text-indigo-500" />
						<h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
							Risk Posture Change
						</h4>
					</div>
					<p className="text-sm text-slate-600 leading-relaxed">
						Shifted from Neutral to Risk-On. Volatility has compressed below historical
						averages, credit spreads remain tight, and momentum breadth has improved
						across sectors. The system now favors full equity exposure.
					</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<AlertCircle className="w-4 h-4 text-amber-500" />
						<h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
							What Could Go Wrong
						</h4>
					</div>
					<p className="text-sm text-slate-600 leading-relaxed">
						Tech concentration risk if QQQ reverses. Rising rates could pressure VNQ.
						A sudden volatility spike could trigger defensive rotation mid-month.
					</p>
				</div>

				<div className="pt-3 border-t border-indigo-100">
					<h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
						What Would Cause Next Month to Flip
					</h4>
					<ul className="text-sm text-slate-600 space-y-1">
						<li>• QQQ falling below its 200-day SMA</li>
						<li>• VIX spiking above 25 for sustained period</li>
						<li>• International equities (EFA) outperforming domestic</li>
					</ul>
				</div>
			</div>
		</Card>
	);
}
