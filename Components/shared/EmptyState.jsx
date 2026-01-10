import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function EmptyState({
	icon: Icon = FileQuestion,
	title = "No data available",
	description = "There's nothing to show here yet.",
	action,
	actionLabel = "Take action"
}) {
	return (
		<Card className="p-12 flex flex-col items-center justify-center text-center bg-white border-slate-200">
			<div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
				<Icon className="w-6 h-6 text-slate-400" />
			</div>
			<h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
			<p className="text-sm text-slate-500 max-w-sm">{description}</p>
			{action && (
				<Button onClick={action} className="mt-4" variant="outline">
					{actionLabel}
				</Button>
			)}
		</Card>
	);
}