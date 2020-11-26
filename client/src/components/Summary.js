import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

function Summary(props) {   
    return(
        <form>
            <label>{props.label}</label>
            <input type="text" value={props.summary[0].Summary} readOnly>
            </input>
        </form>
    );
}

export default Summary;