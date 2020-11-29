import React, { useState } from 'react';
import Config from '../data/config';

function EditButton(props) {
    const [value, setValue] = useState();
    var userId = props.userId;
    var rowId = props.rowId;
    
    function handleChange(e) {
        setValue(e.currentTarget.value);
    }

    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                inAmount: 1,
				inCategoryID: 1,
				inFrequencyID: 1
			})
        }

        fetch(Config.fetchURL + "income/" + userId + '/' + rowId, requestOptions)
    }

   return(
        <form className="tableForm" onSubmit={handleSubmit}>
            <input 
                placeholder="Enter new value here"
                onChange={handleChange}
            ></input>
            <button className="tableButton" type="submit">
                Edit
            </button>
        </form>
   ) 
}

export default EditButton;