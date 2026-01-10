import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, XCircle, TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatusConfig {
	className: string;
	icon: LucideIcon;
}

const statusConfig: Record<string, StatusConfig> = {
	eligible: {
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
		icon: CheckCircle
	},
	selected: {
		className: "bg-indigo-50 text-indigo-700 border-indigo-200",
		icon: CheckCircle
	},
	warning: {
		className: "bg-amber-50 text-amber-700 border-amber-200",
		icon: AlertTriangle
	},
	pending: {
		className: "bg-slate-100 text-slate-600 border-slate-200",
		icon: Clock
	},
	approved: {
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
		icon: CheckCircle
	},
	reviewed: {
		className: "bg-blue-50 text-blue-700 border-blue-200",
		icon: CheckCircle
	},
	ineligible: {
		className: "bg-slate-100 text-slate-500 border-slate-200",
		icon: XCircle
	},
	"risk-on": {
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
		icon: TrendingUp
	},
	"risk-off": {
		className: "bg-rose-50 text-rose-700 border-rose-200",
		icon: TrendingDown
	},
	choppy: {
		className: "bg-amber-50 text-amber-700 border-amber-200",
		icon: AlertTriangle
	},
	buy: {
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
		icon: TrendingUp
	},
	sell: {
		className: "bg-rose-50 text-rose-700 border-rose-200",
		icon: TrendingDown
	}
};

interface StatusBadgeProps {
	status?: string;
	showIcon?: boolean;
	className?: string;
}

export default function StatusBadge({ status, showIcon = true, className = "" }: StatusBadgeProps) {
	const config = statusConfig[status?.toLowerCase() || ""] || statusConfig.pending;
	const Icon = config.icon;

	return (
		<Badge
			variant="outline"
			className={`${config.className} border font-medium gap-1 ${className}`}
		>
			{showIcon && <Icon className="w-3 h-3" />}
			{status ? status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ') : "Pending"}
		</Badge>
	);
}
