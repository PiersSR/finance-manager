import React, { useEffect, useState } from 'react';

function Dropdown(props) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([{ label: "Loading...", value: "" }]);
    const [value, setValue] = useState("N/A");

    useEffect(() => {
        async function getValues() {
            const fetchURL = 'http://localhost:9000/' + props.getRequest;
            const response = await fetch(fetchURL);
            const body = await response.json();

            setItems(body[0].map(
                (obj) => (
                    { label: obj[props.columnName], value: obj[props.columnName] }
                ) 
            ));
            setLoading(false);
        }
        getValues();
    }, []);
    
    function handleChange(e) {
        setValue(e.currentTarget.value);
        
        switch(props.type) {
            case "category":
                props.getCategory(e.currentTarget.value);
                break;
            case "frequency":
                props.getFrequency(e.currentTarget.value);
                break;
            default:
                alert("Dropdown type was not recognised");
        }
    }

    return (
        <select 
            disabled={loading}
            value={value}
            onChange={handleChange}
        >
            {items.map(({ label, value }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown; 