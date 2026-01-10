import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from "recharts";

interface EquityDataPoint {
	date: string;
	portfolio: number;
	benchmark?: number;
}

interface EquityCurveProps {
	data: EquityDataPoint[];
	showBenchmark?: boolean;
	height?: number;
}

interface TooltipProps {
	active?: boolean;
	payload?: Array<{
		name: string;
		value: number;
		color: string;
	}>;
	label?: string;
}

export default function EquityCurve({ data, showBenchmark = true, height = 300 }: EquityCurveProps) {
	const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-slate-200">
					<p className="text-xs font-medium text-slate-500 mb-2">{label}</p>
					{payload.map((entry, index) => (
						<div key={index} className="flex items-center gap-2">
							<div
								className="w-2 h-2 rounded-full"
								style={{ backgroundColor: entry.color }}
							/>
							<span className="text-sm text-slate-600">{entry.name}:</span>
							<span className="text-sm font-medium text-slate-900">
								${entry.value.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<ResponsiveContainer width="100%" height={height}>
			<LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
				<XAxis
					dataKey="date"
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: '#64748b' }}
					dy={10}
				/>
				<YAxis
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: '#64748b' }}
					tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
					dx={-10}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend
					verticalAlign="top"
					height={36}
					iconType="circle"
					iconSize={8}
					wrapperStyle={{ fontSize: '12px' }}
				/>
				<Line
					type="monotone"
					dataKey="portfolio"
					name="Strategy"
					stroke="#4f46e5"
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 4, strokeWidth: 0 }}
				/>
				{showBenchmark && (
					<Line
						type="monotone"
						dataKey="benchmark"
						name="SPY"
						stroke="#94a3b8"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
						activeDot={{ r: 4, strokeWidth: 0 }}
					/>
				)}
			</LineChart>
		</ResponsiveContainer>
	);
}
