import React, { useState } from 'react';
import Config from '../data/config';
import { nanoid } from 'nanoid';

function EditButton(props) {
    const [value, setValue] = useState();
    var userId = props.userId;
    var rowId = props.rowId;

    /**
     * Edits an income value.
     */
    function editIncome() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                inAmount: value,
				inCategoryID: props.rowData.CategoryId,
				inFrequencyID: props.rowData.FrequencyId
			})
        }
        
        fetch(Config.fetchURL + "income/" + userId + '/' + rowId, requestOptions)
            .then((response) => {
                props.getAllValues();
            });
    }
    
    /**
     * Edits an expense value.
     */
    function editExpense() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                inAmount: value,
				inCategoryID: props.rowData.CategoryId,
				inFrequencyID: props.rowData.FrequencyId
			})
        }
        
        fetch(Config.fetchURL + "expenses/" + userId + '/' + rowId, requestOptions)
            .then((response) => {
                props.getAllValues();
            });
    }

    /**
     * Edits an expense value.
     */
    function editCategory() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                inCategory: value,
				inCategoryID: props.rowData.CategoryId
			})
        }
        
        fetch(Config.fetchURL + "categories/" + userId, requestOptions)
            .then((response) => {
                props.getAllValues();
            });
    }

    /**
     * Edits an expense value.
     */
    function editFrequency() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inFrequencyID: props.rowData.FrequencyId,
                inFrequency: value
			})
        }
        
        fetch(Config.fetchURL + "frequencies/" + userId, requestOptions)
            .then((response) => {
                props.getAllValues();
            });
    }

    /**
     * Handles changes to the input value.
     * @param {*} e The event's data.
     */
    function handleChange(e) {
        setValue(e.currentTarget.value);
    }

    /**
     * Handles form submission.
     */
    function handleSubmit(e) {
        e.preventDefault();

        switch(props.type) {
            case "income":
                editIncome();
                break;
            case "expenses":
                editExpense();
                break;
            case "categories":
                editCategory();
                break;
            case "frequencies":
                editFrequency();
                break;
            default:
                alert('Type \'' + props.type + '\' was not recognised.')
        }
    }

    return(
        <form className="tableForm" onSubmit={handleSubmit}>
            <input 
                className="tableInput"
                placeholder="New Value"
                onChange={handleChange}
                type={props.inputType}
                value={value}
                step="0.01"
                min="0.00"
            ></input>
            <button 
                id={nanoid()}
                className="tableButton" 
                type="submit"
            >
                Edit
            </button>
        </form>
   ) 
}

export default EditButton;