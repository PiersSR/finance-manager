import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

function Summary(props) {   
    return(
        <form className="form">
            <label>{props.label}</label>
            <input type="text" value={props.summary.Summary} readOnly></input>
            <label>Total Income</label>
            <input type="text" value={props.summary.TotalIncome} readOnly></input>
            <label>Total Expenses</label>
            <input type="text" value={props.summary.TotalExpenses} readOnly></input>
        </form>
    );
}

export default Summary;