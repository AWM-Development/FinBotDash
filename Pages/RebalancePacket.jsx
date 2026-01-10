import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileText, Clock } from "lucide-react";
import TargetAllocation from "@/components/packet/TargetAllocation";
import ProposedTrades from "@/components/packet/ProposedTrades";
import TaxNotes from "@/components/packet/TaxNotes";
import AIExplanation from "@/components/packet/AIExplanation";
import ApprovalWorkflow from "@/components/packet/ApprovalWorkflow";

export default function RebalancePacket() {
	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
							January 2026 Rebalance Packet
						</h1>
						<p className="text-sm text-slate-500 mt-1">
							Monthly action recommendations ready for review
						</p>
					</div>
					<Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1.5 self-start">
						<AlertTriangle className="w-3.5 h-3.5" />
						Needs Review
					</Badge>
				</div>
			</div>

			{/* Packet Info Bar */}
			<Card className="p-4 mb-6 bg-slate-50 border-slate-200">
				<div className="flex flex-wrap items-center gap-6 text-sm">
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4 text-slate-400" />
						<span className="text-slate-600">Generated:</span>
						<span className="font-medium text-slate-900">Jan 28, 2026 at 6:00 AM ET</span>
					</div>
					<div className="flex items-center gap-2">
						<FileText className="w-4 h-4 text-slate-400" />
						<span className="text-slate-600">Strategy:</span>
						<span className="font-medium text-slate-900">Baseline v1 + Phase B</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle className="w-4 h-4 text-emerald-500" />
						<span className="text-emerald-700 font-medium">All validation checks passed</span>
					</div>
				</div>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<TargetAllocation />
					<ProposedTrades />
					<AIExplanation />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<TaxNotes />
					<ApprovalWorkflow status="pending" />
				</div>
			</div>
		</div>
	);
}