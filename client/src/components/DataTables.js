import React from 'react';
import DataTable from 'react-data-table-component';

const incomeColumns = [
    {
        name: 'Income',
        selector: 'amount',
        sortable: true,
    },
    {
        name: 'Category',
        selector: 'Category',
        sortable: true,
    }
]

const expenseColumns =   [ 
    {
        name: 'Expense',
        selector: 'amount',
        sortable: true,
    },
    {
        name: 'Category',
        selector: 'Category',
        sortable: true
    }
]

function DataTables(props) {
    return (
        <div>
            <DataTable
                title="Income"
                columns={incomeColumns}
                data={props.income}
            />
            <DataTable
                title="Expenses"
                columns={expenseColumns}
                data={props.expenses}
            />
        </div>
    );
}

export default DataTables;