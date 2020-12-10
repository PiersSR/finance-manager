import React, {useState} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import TableForm from './TableForm';

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

const customStyles = {
    contextMenu: {
        style: {
            fontSize: '0px'
        }
    },
    tableWrapper: {
        style: {
            overflow: 'auto'
        }
    }
}

/**
 * Create's a custom table theme.
 */
createTheme('money', {
    text: { primary: '#1d3557', secondary: '#457b9d', },
    background: { default: '#f1faee', },
    context: { background: '#a8dadc', text: '#1d3557', },
    divider: { default: '#e63946' }, 
    action: { button: 'rgba(37, 78, 88, 1)', hover: 'rgba(69, 123, 157, 1)', disabled: 'rgba(110, 102, 88, 1)', },
});

/* #e63946 #f1faee #a8dadc #457b9d #1d3557 */

/**
 * Renders a data table.
 * @param {*} props Properties passed in from the parent.
 */
function Table(props) {
    var columns;
    var type = props.type;
    var inputType;
    const [isRowAlreadySelected, toggleRowSelected] = useState(false);
    const [rowId, setRowId] = useState({Id: null, Value: null});
    const [rowData, setRowData] = useState(
        { CategoryId: null, FrequencyId: null }
    );

    function setDisabledRow(row) {
        if (props.type === "categories" || props.type === "frequencies") {
            if (row.CategoryId === 1 || row.FrequencyId === 1) {
                return true;
            }
        }
    }
    /**
     * Handles changes to the table.
     * @param {*} e The event's data.
     */
    function handleChange(e) {
        // Set the row id to the selected row.
        setRowId(e.selectedRows.map((obj) => obj.Id)[0]);

        // Get the relevant ids of the selected row.
        setRowData((e.selectedRows.map((obj) => ({ CategoryId: obj.CategoryId, FrequencyId: obj.FrequencyId}))[0]));

        if(e.selectedCount > 1) {
            toggleRowSelected(!isRowAlreadySelected);
        }
    }

    switch(props.type) {
        case "income":
            columns = incomeColumns;
            inputType = "tel"
            break;
        case "expenses":
            columns = expenseColumns;
            inputType = "tel"
            break;
        case "categories":
            columns = categoryColumns;
            inputType = "text"
            break;
        case "frequencies":
            columns = frequencyColumns;
            inputType = "text"
            break;
        default:
            alert("Column type" + props.type + "not recognised");
    }

    return (
        <div className={props.className}>
            <DataTable
                title={props.title}
                className={"rdt_TableHeader"}
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
                selectableRowDisabled={setDisabledRow}
                customStyles={customStyles}
                contextActions={[
                    <TableForm 
                        userId={props.userId}
                        rowId={rowId}
                        rowData={rowData}
                        type={type}
                        inputType={inputType}
                        getAllValues={props.getAllValues}
                    />
                ]}
            />
        </div>
    );
}

export default Table;