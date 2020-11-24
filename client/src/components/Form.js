import React, { useState } from 'react';
import Dropdown from './Dropdown';

function Form(props) {
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addIncome(value);
        setValue(value);
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
            <label>
                Amount:
            </label>
        </h2>
        <input
            type="number"
            name="price"
            min="0"
            step=".01"
            id="new-todo-input"
            className="input input__lg"
            autoComplete="off"
            value={value}
            onChange={handleChange}
        />
        <label>
            Category:
            <Dropdown
                getRequest="getCategories"
                columnName="Category"
            />
        </label>
        <label>
            Frequency: 
            <Dropdown
                getRequest="getFrequencies"
                columnName="Frequency"
            />
        </label>
        <button type="submit" className="btn btn__primary btn__lg">
            Add
        </button>
        </form>
    );
}

export default Form;