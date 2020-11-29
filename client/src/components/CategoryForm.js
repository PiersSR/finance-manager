import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Config from '../data/config'

function CategoryForm(props) {
    const [value, setValue] = useState();
    const [category, setCategory] = useState("General");
    const [frequency, setFrequency] = useState("Monthly");

    function addCategory(value) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inCategory: value
			})
		}

        fetch(Config.fetchURL + 'categories/' + props.userId, requestOptions)
            .then((response) => {
                props.getCategories();
            });
	}

	function editCategory(value, newValue) {
		alert('Not yet implemented')
	}

	function deleteCategory(value) {
		alert('Not yet implemented')
	}

    /// Handles any changes made to the amount field
    function handleChange(e) {
        setValue(e.target.value);
    }

    /// Handles the form submission event
    function handleSubmit(e) {
        e.preventDefault();
        addCategory(value);
    }

    /// @param e: The element holding the current category value
    /// Gets the category to the current selected value in the category dropdown
    function getCategory(inCategory) {
        setCategory(inCategory);
    }

    return(
        <form 
            className="formContent"
            onSubmit={handleSubmit}
        >
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={value}
                    onChange={handleChange}
                />
                <button 
                    id="add"
                    type="submit"
                >
                    Add
                </button>
        </form>
    );
}

export default CategoryForm;