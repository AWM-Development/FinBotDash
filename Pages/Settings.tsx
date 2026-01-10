import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Settings as SettingsIcon,
	Lock,
	Calendar,
	Target,
	Database,
	Bell,
	Copy,
	CheckCircle
} from "lucide-react";

interface UniverseETF {
	ticker: string;
	name: string;
	assetClass: string;
}

const universeETFs: UniverseETF[] = [
	{ ticker: "SPY", name: "S&P 500", assetClass: "Equity" },
	{ ticker: "QQQ", name: "Nasdaq 100", assetClass: "Equity" },
	{ ticker: "IWM", name: "Russell 2000", assetClass: "Equity" },
	{ ticker: "EFA", name: "Intl Developed", assetClass: "Equity" },
	{ ticker: "VNQ", name: "Real Estate", assetClass: "Real Assets" },
	{ ticker: "TLT", name: "Long-Term Treasury", assetClass: "Bonds" },
	{ ticker: "IEF", name: "Intermediate Treasury", assetClass: "Bonds" },
	{ ticker: "SHY", name: "Short-Term Treasury", assetClass: "Cash" },
];

export default function Settings() {
	const [isBaseline, setIsBaseline] = useState<boolean>(true);
	const [riskFreeRate, setRiskFreeRate] = useState<string>("4.5");
	const [volatilityTarget, setVolatilityTarget] = useState<boolean>(true);
	const [targetVol, setTargetVol] = useState<string>("15");
	const [rebalanceDay, setRebalanceDay] = useState<string>("1");

	return (
		<div className="p-6 lg:p-8 max-w-5xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
				<p className="text-sm text-slate-500 mt-1">Strategy configuration and preferences</p>
			</div>

			{/* Baseline Warning */}
			{isBaseline && (
				<Card className="p-4 mb-6 bg-amber-50 border-amber-200">
					<div className="flex items-start gap-3">
						<Lock className="w-5 h-5 text-amber-600 shrink-0" />
						<div>
							<p className="text-sm font-medium text-slate-900">Baseline v1 is Locked</p>
							<p className="text-sm text-slate-600 mt-1">
								Strategy settings cannot be modified to preserve reproducibility.
								Clone this strategy to create an experimental version.
							</p>
							<Button variant="outline" size="sm" className="mt-3 gap-2">
								<Copy className="w-4 h-4" />
								Clone Strategy
							</Button>
						</div>
					</div>
				</Card>
			)}

			<div className="space-y-6">
				{/* Strategy Settings */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-6">
						<SettingsIcon className="w-5 h-5 text-slate-600" />
						<h3 className="text-sm font-semibold text-slate-900">Strategy Settings</h3>
						{isBaseline && (
							<Badge className="bg-slate-100 text-slate-600 ml-2">
								<Lock className="w-3 h-3 mr-1" />
								Locked
							</Badge>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Momentum Weights</Label>
							<div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
								3-month: 33.3% | 6-month: 33.3% | 12-month: 33.3%
							</div>
						</div>

						<div className="space-y-2">
							<Label>Trend Filter</Label>
							<div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
								200-day Simple Moving Average
							</div>
						</div>

						<div className="space-y-2">
							<Label>Selection Count</Label>
							<div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
								Top 3 eligible ETFs
							</div>
						</div>

						<div className="space-y-2">
							<Label>Equal Weight</Label>
							<div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
								33.33% per selection
							</div>
						</div>
					</div>
				</Card>

				{/* Risk Settings */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-6">
						<Target className="w-5 h-5 text-slate-600" />
						<h3 className="text-sm font-semibold text-slate-900">Risk Settings</h3>
					</div>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<Label>Volatility Targeting</Label>
								<p className="text-xs text-slate-500 mt-1">Scale position sizes based on volatility</p>
							</div>
							<Switch
								checked={volatilityTarget}
								onCheckedChange={setVolatilityTarget}
								disabled={isBaseline}
							/>
						</div>

						{volatilityTarget && (
							<div className="space-y-2">
								<Label>Target Volatility (%)</Label>
								<Input
									type="number"
									value={targetVol}
									onChange={(e) => setTargetVol(e.target.value)}
									disabled={isBaseline}
									className="w-32"
								/>
							</div>
						)}

						<div className="space-y-2">
							<Label>Risk-Free Rate for Sharpe (%)</Label>
							<Input
								type="number"
								value={riskFreeRate}
								onChange={(e) => setRiskFreeRate(e.target.value)}
								disabled={isBaseline}
								className="w-32"
								step="0.1"
							/>
							<p className="text-xs text-slate-500">Used for performance calculations</p>
						</div>
					</div>
				</Card>

				{/* Rebalance Schedule */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-6">
						<Calendar className="w-5 h-5 text-slate-600" />
						<h3 className="text-sm font-semibold text-slate-900">Rebalance Schedule</h3>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Rebalance Day</Label>
							<Select value={rebalanceDay} onValueChange={setRebalanceDay} disabled={isBaseline}>
								<SelectTrigger className="w-48">
									<SelectValue placeholder="Select day" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">1st of month</SelectItem>
									<SelectItem value="first-trading">First trading day</SelectItem>
									<SelectItem value="last-trading">Last trading day</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="p-3 bg-slate-50 rounded-lg">
							<p className="text-sm text-slate-600">
								<strong>Next rebalance:</strong> February 3, 2026 (Monday)
							</p>
						</div>
					</div>
				</Card>

				{/* Universe */}
				<Card className="p-5">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-2">
							<Database className="w-5 h-5 text-slate-600" />
							<h3 className="text-sm font-semibold text-slate-900">Universe</h3>
						</div>
						<Badge variant="outline">{universeETFs.length} ETFs</Badge>
					</div>

					<Table>
						<TableHeader>
							<TableRow className="bg-slate-50">
								<TableHead className="font-semibold">Ticker</TableHead>
								<TableHead className="font-semibold">Name</TableHead>
								<TableHead className="font-semibold">Asset Class</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{universeETFs.map((etf) => (
								<TableRow key={etf.ticker}>
									<TableCell className="font-semibold text-slate-900">{etf.ticker}</TableCell>
									<TableCell className="text-slate-600">{etf.name}</TableCell>
									<TableCell>
										<Badge variant="outline" className="text-xs">
											{etf.assetClass}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>

				{/* Data Sources */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-6">
						<Database className="w-5 h-5 text-slate-600" />
						<h3 className="text-sm font-semibold text-slate-900">Data Sources</h3>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
							<div>
								<p className="text-sm font-medium text-slate-900">Price Data</p>
								<p className="text-xs text-slate-500">Tiingo End-of-Day</p>
							</div>
							<Badge className="bg-emerald-100 text-emerald-700 gap-1">
								<CheckCircle className="w-3 h-3" />
								Connected
							</Badge>
						</div>

						<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
							<div>
								<p className="text-sm font-medium text-slate-900">Last Update</p>
								<p className="text-xs text-slate-500">Jan 27, 2026 4:00 PM ET</p>
							</div>
							<Button variant="outline" size="sm">Refresh</Button>
						</div>
					</div>
				</Card>

				{/* Notifications */}
				<Card className="p-5">
					<div className="flex items-center gap-2 mb-6">
						<Bell className="w-5 h-5 text-slate-600" />
						<h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-900">Packet Generated</p>
								<p className="text-xs text-slate-500">Get notified when monthly packet is ready</p>
							</div>
							<Switch defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-900">Signal Changes</p>
								<p className="text-xs text-slate-500">Alert when rankings change significantly</p>
							</div>
							<Switch defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-900">TLH Opportunities</p>
								<p className="text-xs text-slate-500">Notify when tax-loss harvesting available</p>
							</div>
							<Switch defaultChecked />
						</div>

						<div className="pt-4 border-t border-slate-200">
							<Label>Notification Email</Label>
							<Input
								type="email"
								placeholder="alex@example.com"
								className="mt-2 w-full max-w-sm"
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
