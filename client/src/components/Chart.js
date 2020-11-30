import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

function Chart(props) {
    const COLORS = ['#1d3557', '#457b9d', '#a8dadc', '#e63946', '#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#3f37c9', '#4361ee', '#4895ef', '#4cc9f0'];
  	const chartData = [{
			"name": "Total Income", "value": parseFloat(props.data[0].TotalIncome)
		}, {
			"name": "Total Expenses", "value": parseFloat(props.data[0].TotalExpenses)
		}];
		
	const groupedChartData = [];
	
	if (props.type === "groupedPieChart") {
		props.data.map(
			(obj) => (
				groupedChartData.push({ "name": obj.Category + " (" + obj.Frequency + ")", "value": parseFloat(obj.Amount) })
			)
		)
	}

	var ungroupedChart = (
		<ResponsiveContainer
			className="chart"
			width={'90%'}
			height={'33%'}
		>
			<PieChart>
				<Pie 
					label={true}
					data={chartData}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={100} 
					animationEasing="linear"
				>
					{chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
				</Pie>
				<Tooltip 
					active={true}
				/>
				<Legend
					verticalAlign="bottom" 
					height={40} 
				/>
			</PieChart>
		</ResponsiveContainer>
	);

	var groupedChart = (
		<ResponsiveContainer
			className="chart"
			width={'90%'}
			height={'25%'}
		>
			<PieChart>
				<Pie 
					label={true}
					data={groupedChartData}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%" 
					animationEasing="linear"
				>
					{groupedChartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
				</Pie>
				<Tooltip />
				<Legend
					verticalAlign="bottom" 
					height={40} 
				/>
			</PieChart>
		</ResponsiveContainer>
	)

	return props.type === "groupedPieChart" ? groupedChart : ungroupedChart;
}

export default Chart;