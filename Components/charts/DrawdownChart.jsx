import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from "recharts";

export default function DrawdownChart({ data, height = 200 }) {
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-slate-200">
					<p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
					<p className="text-sm font-medium text-rose-600">
						{payload[0].value.toFixed(2)}%
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<ResponsiveContainer width="100%" height={height}>
			<AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
					tickFormatter={(value) => `${value}%`}
					dx={-10}
					domain={['auto', 0]}
				/>
				<Tooltip content={<CustomTooltip />} />
				<defs>
					<linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
						<stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
					</linearGradient>
				</defs>
				<Area
					type="monotone"
					dataKey="drawdown"
					stroke="#f43f5e"
					strokeWidth={2}
					fill="url(#drawdownGradient)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}