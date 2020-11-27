import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

function Charts(props) {
    const chartData = [
        {
          "name": "TotalIncome",
          "value": props.summary.TotalIncome
        },
        {
          "name": "TotalExpenses",
          "value": props.summary.TotalExpenses
        }
    ];    

    return (
        <PieChart width={500} height={400}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" outerRadius={100} fill="#8884d8" />
        </PieChart>
    )
}

export default Charts;