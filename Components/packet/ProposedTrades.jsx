import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const trades = [
	{
		action: "Buy",
		ticker: "QQQ",
		amount: 6150,
		shares: 12,
		reason: "Rebalance",
		notes: "Use limit order near midpoint spread"
	},
	{
		action: "Sell",
		ticker: "IWM",
		amount: 4200,
		shares: 20,
		reason: "Regime shift",
		notes: "Consider tax lot selection"
	},
	{
		action: "Buy",
		ticker: "VNQ",
		amount: 2800,
		shares: 32,
		reason: "Risk scaling",
		notes: "Standard order"
	},
];

const reasonColors = {
	Rebalance: "bg-slate-100 text-slate-700",
	"Regime shift": "bg-amber-100 text-amber-700",
	"Risk scaling": "bg-blue-100 text-blue-700",
	"TLH swap": "bg-emerald-100 text-emerald-700",
};

export default function ProposedTrades() {
	return (
		<Card className="overflow-hidden">
			<div className="p-5 border-b border-slate-200">
				<h3 className="text-sm font-semibold text-slate-900">Proposed Trades</h3>
				<p className="text-xs text-slate-500 mt-1">Order ticket for this month's rebalance</p>
			</div>

			<Table>
				<TableHeader>
					<TableRow className="bg-slate-50">
						<TableHead className="font-semibold">Action</TableHead>
						<TableHead className="font-semibold">Ticker</TableHead>
						<TableHead className="font-semibold">Amount</TableHead>
						<TableHead className="font-semibold">Est. Shares</TableHead>
						<TableHead className="font-semibold">Reason</TableHead>
						<TableHead className="font-semibold">Notes</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{trades.map((trade, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className="flex items-center gap-2">
									{trade.action === "Buy" ? (
										<ArrowUpCircle className="w-5 h-5 text-emerald-500" />
									) : (
										<ArrowDownCircle className="w-5 h-5 text-rose-500" />
									)}
									<span className={`font-medium ${trade.action === "Buy" ? "text-emerald-700" : "text-rose-700"
										}`}>
										{trade.action}
									</span>
								</div>
							</TableCell>
							<TableCell className="font-semibold text-slate-900">
								{trade.ticker}
							</TableCell>
							<TableCell className="font-medium">
								${trade.amount.toLocaleString()}
							</TableCell>
							<TableCell className="text-slate-600">
								~{trade.shares}
							</TableCell>
							<TableCell>
								<Badge className={reasonColors[trade.reason]}>
									{trade.reason}
								</Badge>
							</TableCell>
							<TableCell className="text-sm text-slate-500 max-w-48">
								{trade.notes}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}