import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

function Chart(props) {
    const COLORS = [  '#1d3557', '#457b9d', '#a8dadc', '#e63946'];
  	const chartData = [{
			"name": "Total Income", "value": parseInt(props.data.TotalIncome)
		}, {
			"name": "Total Expenses", "value": parseInt(props.data.TotalExpenses)
		}];

	const groupedChartData = [];

	if (props.type === "groupedPieChart")
	{
		props.data.map(
			(obj) => (
				groupedChartData.push({ "name": obj.Category, "value": obj.Amount })
			)
		)
	}

	var ungroupedChart = (
		<div className="chart">
			<PieChart width={367} height={367}>
				<Pie 
				data={chartData}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={100} fill="#f1faee" 
				animationEasing="linear"
				>
					{chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
				</Pie>
				<Tooltip />
				<Legend
					verticalAlign="center" 
					height={40} 
				/>
			</PieChart>
		</div>
	);

	var groupedChart = (
		<div className="chart">
			<PieChart width={367} height={367}>
				<Pie 
				data={groupedChartData}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={100} fill="#f1faee" 
				animationEasing="linear"
				>
					{chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
				</Pie>
				<Tooltip />
				<Legend
					verticalAlign="center" 
					height={40} 
				/>
			</PieChart>
		</div>
	)

	return props.type === "groupedPieChart" ? groupedChart : ungroupedChart;
}

export default Chart;