import React, {useState} from 'react';
import Form from './Form';
import DataTable, { createTheme } from 'react-data-table-component';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

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

const categoryColumns = [
    { name: 'Category', selector: 'Value', sortable: false }
]

const frequencyColumns = [
    { name: 'Frequency', selector: 'Value', sortable: false }
]

createTheme('money', {
    text: {
        primary: '#1d3557',
        secondary: '#457b9d',
    },
    background: {
        default: '#f1faee',
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
    const [isRowAlreadySelected, toggleRowSelected] = useState(false);
    const [rowId, setRowId] = useState({Id: null, Value: null});

    function handleChange(e) {
        setRowId(e.selectedRows.map((obj) => obj.Id)[0])
        
        if(e.selectedCount > 1) {
            toggleRowSelected(!isRowAlreadySelected);
        }
    }

    switch(props.type) {
        case "income":
            columns = incomeColumns;
            break;
        case "expenses":
            columns = expenseColumns;
            break;
        case "categories":
            columns = categoryColumns;
            break;
        case "frequencies":
            columns = frequencyColumns;
            break;
        default:
            alert("Column type" + props.type + "not recognised");
    }

    return (
        <div>
            <DataTable
                title={props.title}
                dense={props.dense}
                type={props.type}
                theme={"money"}
                columns={columns}
                data={props.data}
                highlightOnHover={true}
                responsive={true}
                fixedHeader={true}
                fixedHeaderScrollHeight={props.scrollHeight}
                selectableRows={props.selectableRows}
                selectableRowsHighlight={true}
                onSelectedRowsChange={handleChange}
                clearSelectedRows={isRowAlreadySelected}
                selectableRowsNoSelectAll={true}
                selectableRowDisabled={false}
                contextActions={[
                    <EditButton 
                        userId={props.userId}
                        rowId={rowId}
                    />,
                    <DeleteButton
                        userId={props.userId} 
                        rowId={rowId}
                    />
                ]}
            />
        </div>
    );
}

export default Table;