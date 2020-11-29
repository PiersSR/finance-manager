import React, { useState } from 'react';
import Dropdown from './Dropdown';

function Form(props) {
    const [amount, setValue] = useState(0.00);
    const [category, setCategory] = useState({
        Id: 1,
        Value: "N/A"
    });
    const [frequency, setFrequency] = useState({
        Id: 1,
        Value: "N/A"
    });

    /// Handles any changes made to the amount field
    function handleChange(e) {
        setValue(e.target.value);
    }

    /// Handles the form submission event
    function handleSubmit(e) {
        e.preventDefault();
    
        switch(props.subType) {
            case "income":
                props.addIncome(amount, category.Id, frequency.Id);
                break;
            case "expense":
                props.addExpense(amount, category.Id, frequency.Id);
                break;
            default:
                alert("Error: Submission type was not recognised.");
        }
    }

    /// @param e: The element holding the current category value
    /// Gets the category to the current selected value in the category dropdown
    function getCategory(id, category) {
        setCategory({ Id: id, Value: category });
    }

    /// @param e: The element holding the current frequency value
    /// Gets the category to the current selected value in the frequency dropdown
    function getFrequency(id, frequency) {
        setFrequency({ Id: id, Value: frequency });
    }

    return(
        <form 
            className="formContent"
            onSubmit={handleSubmit}
        >
            <label>Amount:</label>
            <input
                type="number"
                name="price"
                min="0.00"
                step=".01"
                autoComplete="off"
                value={amount}
                onChange={handleChange}
            />
            <label>Category:</label>
            <Dropdown
                columnName="Category"
                type="category"
                getCategory={getCategory}
                data={props.categories}
            />
            <label>Frequency:</label>
            <Dropdown
                columnName="Frequency"
                type="frequency"
                getFrequency={getFrequency}
                data={props.frequencies}
            />
            <button 
                className="addButton"
                type="submit"
            >
                Add
            </button>
        </form>
    );
}

export default Form;