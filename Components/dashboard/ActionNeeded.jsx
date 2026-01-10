import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, DollarSign, AlertTriangle, ChevronRight } from "lucide-react";

const actions = [
	{
		id: 1,
		title: "Review Rebalance Packet (January 2026)",
		description: "Monthly rebalance recommendations ready",
		icon: FileText,
		page: "RebalancePacket",
		priority: "high",
		completed: false
	},
	{
		id: 2,
		title: "1 TLH opportunity detected",
		description: "Potential tax savings of ~$340",
		icon: DollarSign,
		page: "TaxTLH",
		priority: "medium",
		completed: false
	},
	{
		id: 3,
		title: "Wash-sale risk: SPY replacement required",
		description: "30-day restriction ends Feb 15",
		icon: AlertTriangle,
		page: "TaxTLH",
		priority: "high",
		completed: false
	}
];

export default function ActionNeeded() {
	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Action Needed</h3>

			<div className="space-y-3">
				{actions.map((action) => (
					<Link
						key={action.id}
						to={createPageUrl(action.page)}
						className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
					>
						<div className={`p-2 rounded-lg ${action.priority === "high"
							? "bg-amber-100 text-amber-700"
							: "bg-slate-100 text-slate-600"
							}`}>
							<action.icon className="w-4 h-4" />
						</div>

						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
								{action.title}
							</p>
							<p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
						</div>

						<ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
					</Link>
				))}
			</div>
		</Card>
	);
}