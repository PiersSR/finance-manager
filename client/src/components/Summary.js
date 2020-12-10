import React from 'react';
import ReactTooltip from 'react-tooltip';

/**
 * Renders a summary form.
 * @param {*} props Properties passed in from the parent.
 */
function Summary(props) {   
    return(
        <form className="summaryForm">
            <div className="value">
                <label>{props.label}</label>
                <input 
                    className="summaryValue"
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