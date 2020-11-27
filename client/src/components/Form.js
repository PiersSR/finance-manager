import React, { useState } from 'react';
import Dropdown from './Dropdown';

function Form(props) {
    const [amount, setValue] = useState(0.00);
    const [category, setCategory] = useState("General");
    const [frequency, setFrequency] = useState("Monthly");

    const CATEGORYID_MAP = {
        General: 1,
        Groceries: 3
    }

    const FREQUENCYID_MAP = {
        Monthly: 1,
        Weekly: 2
    }

    /// Handles any changes made to the amount field
    function handleChange(e) {
        setValue(e.target.value);
    }

    /// Handles the form submission event
    function handleSubmit(e) {
        e.preventDefault();

        switch(props.type) {
            case "addIncome":
                props.addIncome(amount, CATEGORYID_MAP[category], FREQUENCYID_MAP[frequency]);
                break;
            case "addExpense":
                props.addExpense(amount, CATEGORYID_MAP[category], FREQUENCYID_MAP[frequency]);
                break;
            default:
                alert("Error: Submission type was not recognised.");
        }
    }

    /// @param e: The element holding the current category value
    /// Gets the category to the current selected value in the category dropdown
    function getCategory(inCategory) {
        setCategory(inCategory);
    }

    /// @param e: The element holding the current frequency value
    /// Gets the category to the current selected value in the frequency dropdown
    function getFrequency(inFrequency) {
        setFrequency(inFrequency);
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Amount:
        </label>
        <input
            type="number"
            name="price"
            min="0.00"
            step=".01"
            autoComplete="off"
            value={amount}
            onChange={handleChange}
        />
        <label>
            Category:
            <Dropdown
                getRequest={"categories/" + props.userId} 
                columnName="Category"
                type="category"
                getCategory={getCategory}
            />
        </label>
        <label>
            Frequency: 
            <Dropdown
                getRequest={"frequencies/" + props.userId}
                columnName="Frequency"
                type="frequency"
                getFrequency={getFrequency}
            />
        </label>
        <button type="submit">
            Add
        </button>
        </form>
    );
}

export default Form;