import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
	LineChart,
	Line,
	ResponsiveContainer,
	Tooltip
} from "recharts";

interface SparklineDataPoint {
	value: number;
}

interface PerformanceData {
	[key: string]: {
		value: number;
		trend: "up" | "down";
	};
}

const mockSparkline: SparklineDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
	value: 100000 + Math.random() * 25000 + i * 500
}));

const performanceData: PerformanceData = {
	"1M": { value: 2.4, trend: "up" },
	"3M": { value: 5.8, trend: "up" },
	"YTD": { value: 8.2, trend: "up" },
	"1Y": { value: 12.5, trend: "up" },
	"Since inception": { value: 45.3, trend: "up" }
};

interface TooltipProps {
	active?: boolean;
	payload?: Array<{
		value: number;
	}>;
}

export default function PerformanceSummary() {
	const [selectedPeriod, setSelectedPeriod] = useState<string>("YTD");
	const [benchmark, setBenchmark] = useState<string>("SPY");

	const periods = Object.keys(performanceData);

	const CustomTooltip = ({ active, payload }: TooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-slate-900 text-white px-2 py-1 rounded text-xs">
					${payload[0].value.toLocaleString()}
				</div>
			);
		}
		return null;
	};

	return (
		<Card className="p-5 bg-white border-slate-200">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-semibold text-slate-900">Performance Summary</h3>
				<div className="flex gap-1">
					{["SPY", "60-40"].map((b) => (
						<Button
							key={b}
							variant={benchmark === b ? "secondary" : "ghost"}
							size="sm"
							className="h-7 text-xs"
							onClick={() => setBenchmark(b)}
						>
							vs {b}
						</Button>
					))}
				</div>
			</div>

			<div className="h-20 mb-4">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={mockSparkline}>
						<Tooltip content={<CustomTooltip />} />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#4f46e5"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="flex gap-2 flex-wrap">
				{periods.map((period) => (
					<button
						key={period}
						onClick={() => setSelectedPeriod(period)}
						className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedPeriod === period
							? "bg-slate-900 text-white"
							: "bg-slate-100 text-slate-600 hover:bg-slate-200"
							}`}
					>
						{period}
					</button>
				))}
			</div>

			<div className="mt-4 flex items-center gap-2">
				<span className="text-2xl font-semibold text-slate-900">
					+{performanceData[selectedPeriod].value}%
				</span>
				{performanceData[selectedPeriod].trend === "up" ? (
					<TrendingUp className="w-5 h-5 text-emerald-500" />
				) : (
					<TrendingDown className="w-5 h-5 text-rose-500" />
				)}
				<span className="text-sm text-slate-500">vs {benchmark}: +{(performanceData[selectedPeriod].value - 1.5).toFixed(1)}%</span>
			</div>
		</Card>
	);
}
