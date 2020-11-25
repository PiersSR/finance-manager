import logo from './logo.svg';
import './App.css';
import config from './data/config.js';
import Form from "./components/Form";
import Dropdown from "./components/Dropdown";
import React, { useEffect, useReg, useState } from 'react';
import { nanoid } from 'nanoid';

function App(props) {
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

    fetch(config.fetchURL + "addIncome", requestOptions);
  }

  /// @param userID: The current userID
  /// @param categoryID: The selected category ID
  /// @param amount: The input amount
  /// @param frequencyID: The selected frequency
  /// Creates a POST request to add an expense record
  function addExpense(userID, amount, category, frequency) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        inUserID: userID,
        inAmount: amount,
        inCategoryID: category,
        inFrequencyID: frequency 
      })
    }
  
    const fetchURL = fetchURL + "addExpense";
    fetch(fetchURL, requestOptions);
  }
  
    return (
    <div className="moneymanager">
      <h1>Money Manager</h1>
      <h2>Summary</h2>
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
    </div>
  );
}

export default App;
