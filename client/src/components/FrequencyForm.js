import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Config from '../data/config';

function FrequencyForm(props) {
    const [value, setValue] = useState();
    const [category, setCategory] = useState("General");
    const [frequency, setFrequency] = useState("Monthly");

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

	function editFrequency(value, newValue) {
		alert('Not yet implemented')
	}

	function deleteFrequency(value) {
		alert('Not yet implemented')
	}

    /// Handles any changes made to the amount field
    function handleChange(e) {
        setValue(e.target.value);
    }

    /// Handles the form submission event
    function handleSubmit(e) {
        e.preventDefault();
        addFrequency(value);
    }

    /// @param e: The element holding the current frequency value
    /// Gets the category to the current selected value in the frequency dropdown
    function getFrequency(inFrequency) {
        setFrequency(inFrequency);
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