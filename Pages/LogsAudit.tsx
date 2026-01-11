import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	FileText,
	RefreshCw,
	Activity,
	CheckCircle,
	AlertTriangle,
	Search,
	MessageSquare,
	Clock,
	type LucideIcon
} from "lucide-react";

interface AuditEvent {
	id: number;
	type: string;
	description: string;
	symbol: string | null;
	date: string;
	timestamp: string;
	user: string;
	notes: string | null;
}

const auditEvents: AuditEvent[] = [
	{
		id: 1,
		type: "packet_approved",
		description: "January 2026 packet approved",
		symbol: null,
		date: "2026-01-28",
		timestamp: "Jan 28, 2026 10:45 AM",
		user: "Alex",
		notes: "All trades executed as recommended"
	},
	{
		id: 2,
		type: "packet_reviewed",
		description: "January 2026 packet marked as reviewed",
		symbol: null,
		date: "2026-01-28",
		timestamp: "Jan 28, 2026 10:30 AM",
		user: "Alex",
		notes: null
	},
	{
		id: 3,
		type: "packet_generated",
		description: "January 2026 rebalance packet generated",
		symbol: null,
		date: "2026-01-28",
		timestamp: "Jan 28, 2026 6:00 AM",
		user: "System",
		notes: null
	},
	{
		id: 4,
		type: "signals_changed",
		description: "Signal rotation: IWM dropped, QQQ added",
		symbol: "QQQ",
		date: "2026-01-27",
		timestamp: "Jan 27, 2026 4:00 PM",
		user: "System",
		notes: "IWM fell below 200-day SMA"
	},
	{
		id: 5,
		type: "data_update",
		description: "Daily price data updated",
		symbol: null,
		date: "2026-01-27",
		timestamp: "Jan 27, 2026 4:00 PM",
		user: "System",
		notes: null
	},
	{
		id: 6,
		type: "override_recorded",
		description: "Manual override recorded for December rebalance",
		symbol: "VNQ",
		date: "2025-12-28",
		timestamp: "Dec 28, 2025 11:15 AM",
		user: "Alex",
		notes: "Reduced VNQ allocation by 5% due to rate concerns"
	},
	{
		id: 7,
		type: "packet_approved",
		description: "December 2025 packet approved",
		symbol: null,
		date: "2025-12-28",
		timestamp: "Dec 28, 2025 10:00 AM",
		user: "Alex",
		notes: null
	},
];

const eventIcons: Record<string, LucideIcon> = {
	packet_generated: FileText,
	data_update: RefreshCw,
	signals_changed: Activity,
	packet_reviewed: CheckCircle,
	packet_approved: CheckCircle,
	override_recorded: AlertTriangle,
};

const eventColors: Record<string, string> = {
	packet_generated: "bg-blue-100 text-blue-700",
	data_update: "bg-slate-100 text-slate-700",
	signals_changed: "bg-purple-100 text-purple-700",
	packet_reviewed: "bg-indigo-100 text-indigo-700",
	packet_approved: "bg-emerald-100 text-emerald-700",
	override_recorded: "bg-amber-100 text-amber-700",
};

export default function LogsAudit() {
	const [search, setSearch] = useState<string>("");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [monthFilter, setMonthFilter] = useState<string>("all");

	const filteredEvents = auditEvents.filter(event => {
		if (search && !event.description.toLowerCase().includes(search.toLowerCase()) &&
			!event.symbol?.toLowerCase().includes(search.toLowerCase())) {
			return false;
		}
		if (typeFilter !== "all" && event.type !== typeFilter) return false;
		if (monthFilter !== "all" && event.date !== monthFilter) return false;
		return true;
	});

	const months = [...new Set(auditEvents.map(e => e.date))];
	const types = [...new Set(auditEvents.map(e => e.type))];

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Logs & Audit</h1>
				<p className="text-sm text-slate-500 mt-1">Transparency and decision trail</p>
			</div>

			{/* Filters */}
			<Card className="p-4 mb-6">
				<div className="flex flex-wrap gap-4">
					<div className="flex-1 min-w-64">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
							<Input
								placeholder="Search events, tickers..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>

					<Select value={typeFilter} onValueChange={setTypeFilter}>
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Event Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							{types.map(type => (
								<SelectItem key={type} value={type}>
									{type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={monthFilter} onValueChange={setMonthFilter}>
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Months</SelectItem>
							{months.map(month => (
								<SelectItem key={month} value={month}>{month}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</Card>

			{/* Event Timeline */}
			<Card>
				<div className="p-5 border-b border-slate-200">
					<h3 className="text-sm font-semibold text-slate-900">Event Timeline</h3>
					<p className="text-xs text-slate-500 mt-1">
						{filteredEvents.length} events found
					</p>
				</div>

				<div className="divide-y divide-slate-100">
					{filteredEvents.map((event) => {
						const Icon = eventIcons[event.type] || Activity;
						return (
							<div key={event.id} className="p-5 hover:bg-slate-50 transition-colors">
								<div className="flex items-start gap-4">
									<div className={`p-2.5 rounded-lg ${eventColors[event.type] || "bg-slate-100 text-slate-700"}`}>
										<Icon className="w-4 h-4" />
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 flex-wrap mb-1">
											<p className="text-sm font-medium text-slate-900">
												{event.description}
											</p>
											{event.symbol && (
												<Badge variant="outline" className="text-xs">
													{event.symbol}
												</Badge>
											)}
										</div>

										<div className="flex items-center gap-4 text-xs text-slate-500">
											<div className="flex items-center gap-1">
												<Clock className="w-3.5 h-3.5" />
												{event.timestamp}
											</div>
											<span>•</span>
											<span>{event.user}</span>
											<span>•</span>
											<span>{event.date}</span>
										</div>

										{event.notes && (
											<div className="mt-3 p-3 bg-slate-50 rounded-lg">
												<div className="flex items-start gap-2">
													<MessageSquare className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
													<p className="text-sm text-slate-600">{event.notes}</p>
												</div>
											</div>
										)}
									</div>

									<Badge className={eventColors[event.type] || "bg-slate-100 text-slate-700"}>
										{event.type.replace(/_/g, ' ')}
									</Badge>
								</div>
							</div>
						);
					})}
				</div>

				{filteredEvents.length === 0 && (
					<div className="p-12 text-center">
						<Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
						<p className="text-sm font-medium text-slate-900 mb-1">No events found</p>
						<p className="text-sm text-slate-500">Try adjusting your search or filters</p>
					</div>
				)}
			</Card>

			{/* Export */}
			<div className="mt-6 flex justify-end">
				<Button variant="outline" className="gap-2">
					<FileText className="w-4 h-4" />
					Export Audit Log
				</Button>
			</div>
		</div>
	);
}
