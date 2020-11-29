import React from 'react';
import Form from './Form';
import DataTable, { createTheme } from 'react-data-table-component';

const incomeColumns = [
    { name: 'Income', selector: 'Amount', sortable: true, },
    { name: 'Category', selector: 'Category', sortable: true, },
    { name: 'Frequency', selector: 'Frequency', sortable: true, }
]

const expenseColumns = [
    { name: 'Expense', selector: 'Amount', sortable: true, },
    { name: 'Category', selector: 'Category', sortable: true },
    { name: 'Frequency', selector: 'Frequency', sortable: true, }
]

createTheme('money', {
    text: {
        primary: '#1d3557',
        secondary: '#457b9d',
    },
    background: {
        default: '#f1faee'
    },
    context: {
        background: '#a8dadc',
        text: '#1d3557',
    },
    divider: {
        default: '#e63946'
    },
    action: {
        button: 'rgba(37, 78, 88, 1)',
        hover: 'rgba(69, 123, 157, 1)',
        disabled: 'rgba(110, 102, 88, 1)',
    },
});

/* #e63946 #f1faee #a8dadc #457b9d #1d3557 */

function Table(props) {
    var columns;

    switch(props.type) {
        case "Income":
            columns = incomeColumns;
            break;
        case "Expenses":
            columns = expenseColumns;
            break;
        default:
            alert("Column type not recognised");
    }
    return (
        <div>
            <DataTable
                title={props.title}
                theme={"money"}
                columns={columns}
                data={props.data}
                highlightOnHover={true}
                responsive={true}
                fixedHeader={true}
                fixedHeaderScrollHeight={"12vh"}
                selectableRows={props.selectableRows}
                selectableRowsHighlight={true}
            />
        </div>
    );
}

export default Table;