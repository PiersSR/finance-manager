import React, { useEffect, useState } from 'react';

function Dropdown(props) {
    const [value, setValue] = useState("N/A");
    
    function handleChange(e) {
        setValue(e.currentTarget.value);
        
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