import React, { useState } from 'react';
import Config from '../data/config'

function CategoryForm(props) {
    const [value, setValue] = useState();

    /**
     * Adds a category for the user.
     * @param {*} value The input value to add.
     */
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

    /**
     * Handles changes made to the form input field.
     * @param {*} e The event's data.
     */
    function handleChange(e) {
        setValue(e.target.value);
    }

    /**
     * Handles form submission. 
     * @param {*} e The event's data.
     */
    function handleSubmit(e) {
        e.preventDefault();
        addCategory(value);
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