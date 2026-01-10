import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
	equity: "#4f46e5",
	bonds: "#06b6d4",
	real_assets: "#f59e0b",
	cash: "#94a3b8"
};

const LABELS = {
	equity: "Equities",
	bonds: "Bonds",
	real_assets: "Real Assets",
	cash: "Cash"
};

export default function AllocationDonut({ data, size = 200 }) {
	const chartData = Object.entries(data).map(([key, value]) => ({
		name: LABELS[key] || key,
		value: value,
		color: COLORS[key] || "#94a3b8"
	})).filter(d => d.value > 0);

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200">
					<p className="text-sm font-medium text-slate-900">{payload[0].name}</p>
					<p className="text-sm text-slate-600">{payload[0].value.toFixed(1)}%</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="flex items-center gap-6">
			<div style={{ width: size, height: size }}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							innerRadius={size * 0.35}
							outerRadius={size * 0.45}
							paddingAngle={2}
							dataKey="value"
							strokeWidth={0}
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="space-y-2">
				{chartData.map((item, index) => (
					<div key={index} className="flex items-center gap-2">
						<div
							className="w-3 h-3 rounded-sm"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-sm text-slate-600">{item.name}</span>
						<span className="text-sm font-medium text-slate-900 ml-auto">
							{item.value.toFixed(1)}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}