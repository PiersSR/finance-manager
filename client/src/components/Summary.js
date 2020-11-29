import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

function Summary(props) {   
    var colorMatch = props.summary.Summary < 0 ? 'red' : 'red';

    return(
        <form className="summaryForm">
            <div className="value">
                <label>{props.label}</label>
                <input 
                    className="summaryValue"
                    data-color={colorMatch}
                    type="text"
                    value={props.summary.Summary} 
                    readOnly></input>
            </div>
            <div className="value">
                <label>Total Income</label>
                <input className="summaryValue"
                    type="text"
                    value={props.summary.TotalIncome} 
                    readOnly></input>
            </div>
            <div className="value">
                <label>Total Expenses</label>
                <input 
                    className="summaryValue"
                    type="text"
                    value={props.summary.TotalExpenses}
                    readOnly></input>
            </div>
        </form>
    );
}

export default Summary;