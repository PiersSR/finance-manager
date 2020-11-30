import React from 'react';
import Config from '../data/config.js';

function DeleteButton(props) {
    var userId = props.userId;
    var rowId = props.rowId;

    /**
     * Handles form submission.
     */
    function handleSubmit() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(Config.fetchURL + props.type + '/' + userId + '/' + rowId, requestOptions)
    }

   return(
       <form onSubmit={handleSubmit}>
        <button className="tableButton" type="submit">
            Delete
        </button>
       </form>
   ) 
}

export default DeleteButton;