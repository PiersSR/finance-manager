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
    
    return (
        <select 
            disabled={loading}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
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