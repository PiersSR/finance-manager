import React, { useState } from 'react';
import Config from '../data/config';

function FrequencyForm(props) {
    const [value, setValue] = useState();

    /**
     * Adds a frequency for the user.
     * @param {string} value The value to add.
     */
    function addFrequency(value) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inFrequency: value
			})
		}

        fetch(Config.fetchURL + 'frequencies/' + props.userId, requestOptions)
            .then((response) => {
                props.getFrequencies();
            });
	}

    /**
     * Handles changes to the input value.
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
        addFrequency(value);
        setValue("");
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

export default FrequencyForm;