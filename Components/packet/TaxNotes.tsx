import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, DollarSign, ArrowRight } from "lucide-react";

export default function TaxNotes() {
	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Tax Notes</h3>

			<div className="space-y-4">
				{/* TLH Suggestion */}
				<div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
					<div className="flex items-start gap-3">
						<DollarSign className="w-5 h-5 text-emerald-600 shrink-0" />
						<div>
							<p className="text-sm font-medium text-slate-900 mb-1">TLH Opportunity</p>
							<div className="flex items-center gap-2 text-sm text-slate-700">
								<span>Harvest loss in VTI</span>
								<ArrowRight className="w-4 h-4 text-slate-400" />
								<span>Replace with ITOT</span>
							</div>
							<p className="text-xs text-slate-500 mt-1">Estimated tax savings: ~$340</p>
						</div>
					</div>
				</div>

				{/* Wash Sale Warning */}
				<div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
					<div className="flex items-start gap-3">
						<AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
						<div>
							<p className="text-sm font-medium text-slate-900 mb-1">Wash Sale Warning</p>
							<p className="text-sm text-slate-700">
								Do not repurchase VTI within 30 days (restriction ends Feb 15, 2026)
							</p>
						</div>
					</div>
				</div>

				{/* Realized Gain/Loss Estimate */}
				<div className="pt-4 border-t border-slate-200">
					<div className="flex items-center justify-between">
						<span className="text-sm text-slate-600">Est. realized gain/loss this packet</span>
						<span className="text-sm font-semibold text-rose-600">-$1,240</span>
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Net tax impact depends on your tax bracket and holding periods
					</p>
				</div>
			</div>
		</Card>
	);
}
