import React, { useState } from 'react';

function Dropdown(props) {
    const [value, setValue] = useState("N/A");
    
    /**
     * Handles changes to the selected value.
     * @param {*} e The event's data.
     */
    function handleChange(e) {
        setValue(e.currentTarget.value);
        
        // Find the category/frequency id based on the selected value.
        const id = props.data.find((obj) => obj.Value === e.currentTarget.value).Id;

        switch(props.type) {
            case "category":
                props.getCategory(id, e.currentTarget.value);
                break;
            case "frequency":
                props.getFrequency(id, e.currentTarget.value);
                break;
            default:
                alert("Dropdown type was not recognised");
        }
    }

    return (
        <select
            disabled={props.loading}
            onChange={handleChange}
            value={value}
        >
            {props.data.map(({ Id, Value }) => (
                <option key={Id} value={Value}>
                    {Value}
                </option>
            ))}
        </select>
    );
}

export default Dropdown; 