import React from 'react';
import DataTable from 'react-data-table-component';

const incomeColumns = [
    {
        name: 'Income',
        selector: 'Income',
        sortable: true,
    }
]

const expenseColumns =   [ 
    {
        name: 'Expense',
        selector: 'Expense',
        sortable: true,
    }
]

function DataTables(props) {
    const data = props.data;

    return (
        <div>
            <DataTable
                title="Income"
                columns={incomeColumns}
                data={data}
            />
            <DataTable
                title="Expenses"
                columns={expenseColumns}
                data={data}
            />
        </div>
    );
}

export default DataTables;