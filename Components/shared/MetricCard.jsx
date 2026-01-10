import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({
	title,
	value,
	change,
	changeLabel,
	icon: Icon,
	trend,
	subtitle,
	className = ""
}) {
	const getTrendColor = () => {
		if (trend === "up") return "text-emerald-600";
		if (trend === "down") return "text-rose-600";
		return "text-slate-500";
	};

	const getTrendIcon = () => {
		if (trend === "up") return <TrendingUp className="w-3.5 h-3.5" />;
		if (trend === "down") return <TrendingDown className="w-3.5 h-3.5" />;
		return <Minus className="w-3.5 h-3.5" />;
	};

	return (
		<Card className={`p-5 bg-white border-slate-200 ${className}`}>
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<p className="text-sm font-medium text-slate-500">{title}</p>
					<p className="text-2xl font-semibold text-slate-900 tracking-tight">{value}</p>
					{(change !== undefined || subtitle) && (
						<div className="flex items-center gap-1.5 pt-1">
							{change !== undefined && (
								<>
									<span className={`flex items-center gap-0.5 text-sm font-medium ${getTrendColor()}`}>
										{getTrendIcon()}
										{change}
									</span>
									{changeLabel && (
										<span className="text-xs text-slate-400">{changeLabel}</span>
									)}
								</>
							)}
							{subtitle && !change && (
								<span className="text-xs text-slate-500">{subtitle}</span>
							)}
						</div>
					)}
				</div>
				{Icon && (
					<div className="p-2.5 rounded-lg bg-slate-100">
						<Icon className="w-5 h-5 text-slate-600" />
					</div>
				)}
			</div>
		</Card>
	);
}