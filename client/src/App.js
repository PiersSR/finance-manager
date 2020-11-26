import logo from './logo.svg';
import './App.css';
import Config from './data/config.js';
import Form from "./components/Form";
import Dropdown from "./components/Dropdown";
import Summary from "./components/Summary";
import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Charts from './components/Charts';
import DataTables from './components/DataTables';
import Cookie from './components/Cookie';

function App(props) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState( [{Summary: 1, TotalIncome: 1, TotalExpenses: 1}] );
  const [tableData, setTableData] = useState( [{ Id: 1, Income: 0, Expense: 0 }] );

  useEffect(() => {
    async function getValue() {
        const fetchURL = 'http://localhost:9000/getSummary/' + 1;
        const response = await fetch(fetchURL);
        const body = await response.json();
        setSummary(body[0].map(
          (obj) => (
            { Summary: obj.Summary, TotalIncome: obj.TotalIncome, TotalExpenses: obj.TotalExpenses }
          )
        ));

        const fetchURL2 = 'http://localhost:9000/getIncomeAndExpenses/' + 1;
        const response2 = await fetch(fetchURL2);
        const body2 = await response2.json();
        setTableData(body2[0].map(
          (obj) => (
            { Id: obj.ID, Income: obj.Income, Expense: obj.Expense }
          )
        ));
        setLoading(false);
    }
    getValue();
  }, []);
  
  /// @param userID: The current userID
  /// @param categoryID: The selected category ID
  /// @param amount: The input amount
  /// @param frequencyID: The selected frequency
  /// Creates a POST request to add an income record
  function addIncome(userID, amount, categoryId, frequencyId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            inUserID: userID,
            inAmount: amount,
            inCategoryID: categoryId,
            inFrequencyID: frequencyId
        })
      }

    fetch(Config.fetchURL + "addIncome", requestOptions);
  }

  /// @param userID: The current userID
  /// @param categoryID: The selected category ID
  /// @param amount: The input amount
  /// @param frequencyID: The selected frequency
  /// Creates a POST request to add an expense record
  function addExpense(userID, amount, categoryId, frequencyId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          inUserID: userID,
          inAmount: amount,
          inCategoryID: categoryId,
          inFrequencyID: frequencyId
      })
    }

    fetch(Config.fetchURL + "addExpense", requestOptions);
  }
  
    return (
      <div className="moneymanager">
        <Cookie />
        <h1>Money Manager</h1>
        <h2>Summary</h2>
          <Summary
            label="Summary"
            summary={summary}
          />
        <h2>Income</h2>
          <Form 
            type="addIncome"
            addIncome={addIncome}
          />
        <h2>Expenses</h2>
          <Form
            type="addExpense"
            addExpense={addExpense}
          />
        <Charts
          summary={summary}
        />
        <DataTables
          data={tableData}
        />
      </div>
  );
}

export default App;
