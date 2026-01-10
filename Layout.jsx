import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import {
	LayoutDashboard,
	Signal,
	FileText,
	Briefcase,
	TrendingUp,
	ShieldAlert,
	Receipt,
	ClipboardList,
	Settings,
	Bell,
	ChevronDown,
	Menu,
	X,
	CheckCircle,
	AlertTriangle,
	HelpCircle
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import HelpDrawer from "@/components/help/HelpDrawer";

const navItems = [
	{ name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
	{ name: "Signals", icon: Signal, page: "Signals" },
	{ name: "Rebalance Packet", icon: FileText, page: "RebalancePacket" },
	{ name: "Portfolio", icon: Briefcase, page: "Portfolio" },
	{ name: "Performance", icon: TrendingUp, page: "Performance" },
	{ name: "Risk", icon: ShieldAlert, page: "Risk" },
	{ name: "Tax & TLH", icon: Receipt, page: "TaxTLH" },
	{ name: "Logs & Audit", icon: ClipboardList, page: "LogsAudit" },
	{ name: "Settings", icon: Settings, page: "Settings" },
];

const strategies = [
	{ id: "baseline-v1", name: "Baseline v1", status: "active" },
	{ id: "paper", name: "Paper Trading", status: "paper" },
	{ id: "tax-optimized", name: "Tax-Optimized", status: "active" },
];

export default function Layout({ children, currentPageName }) {
	const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
	const [mobileOpen, setMobileOpen] = useState(false);

	const Sidebar = ({ mobile = false }) => (
		<div className={`flex flex-col h-full ${mobile ? "" : "w-64"}`}>
			<div className="p-6 border-b border-slate-200">
				<h1 className="text-xl font-semibold text-slate-900 tracking-tight">
					Atlas Allocator
				</h1>
				<p className="text-xs text-slate-500 mt-1">AI-Augmented Investing</p>
			</div>

			<nav className="flex-1 p-4 space-y-1 overflow-y-auto">
				{navItems.map((item) => {
					const isActive = currentPageName === item.page;
					return (
						<Link
							key={item.name}
							to={createPageUrl(item.page)}
							onClick={() => mobile && setMobileOpen(false)}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
								? "bg-indigo-50 text-indigo-700"
								: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
								}`}
						>
							<item.icon className={`w-[18px] h-[18px] ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
							{item.name}
							{item.name === "Rebalance Packet" && (
								<Badge className="ml-auto bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] px-1.5">
									Review
								</Badge>
							)}
						</Link>
					);
				})}
			</nav>

			<div className="p-4 border-t border-slate-200">
				<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50">
					<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
					<span className="text-xs text-slate-600">System Healthy</span>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Desktop Sidebar */}
			<aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-slate-200">
				<Sidebar />
			</aside>

			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
				<div className="flex items-center justify-between">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="-ml-2">
								<Menu className="w-5 h-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="p-0 w-72">
							<Sidebar mobile />
						</SheetContent>
					</Sheet>

					<h1 className="text-lg font-semibold text-slate-900">Atlas Allocator</h1>

					<Button variant="ghost" size="icon" className="relative">
						<Bell className="w-5 h-5 text-slate-600" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<main className="lg:pl-64">
				{/* Top Bar */}
				<header className="hidden lg:flex sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-4 items-center justify-between">
					<div className="flex items-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="gap-2 font-medium">
									<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
									{selectedStrategy.name}
									<ChevronDown className="w-4 h-4 text-slate-400" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								{strategies.map((strategy) => (
									<DropdownMenuItem
										key={strategy.id}
										onClick={() => setSelectedStrategy(strategy)}
										className="gap-2"
									>
										<div className={`w-2 h-2 rounded-full ${strategy.status === "active" ? "bg-emerald-500" : "bg-amber-500"
											}`}></div>
										{strategy.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="gap-2 text-slate-600">
									January 2026
									<ChevronDown className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>January 2026 (Latest)</DropdownMenuItem>
								<DropdownMenuItem>December 2025</DropdownMenuItem>
								<DropdownMenuItem>November 2025</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200 gap-1.5">
							<AlertTriangle className="w-3 h-3" />
							Needs Review
						</Badge>
					</div>

					<div className="flex items-center gap-3">
						<HelpDrawer />
						<Button variant="ghost" size="icon" className="relative text-slate-500">
							<Bell className="w-5 h-5" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
						</Button>
						<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
							<span className="text-sm font-medium text-indigo-700">A</span>
						</div>
					</div>
				</header>

				<div className="pt-16 lg:pt-0 min-h-screen">
					{children}
				</div>
			</main>
		</div>
	);
}