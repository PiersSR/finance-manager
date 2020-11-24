import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";
import Dropdown from "./components/Dropdown";
import React, { useEffect, useReg, useState } from 'react';
import { nanoid } from 'nanoid';

const CATEGORY_MAP = {
  General: 1
}

const FREQUENCY_MAP = {
  Monthly: 1
}

const CATEGORY_NAMES = Object.keys(CATEGORY_MAP);
const FREQUENCY_NAMES = Object.keys(FREQUENCY_MAP);

function addIncome(value, categoryid, frequencyid) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID: 1, amount: value, category: CATEGORY_NAMES[categoryid], frequency: FREQUENCY_NAMES[frequencyid] })
  }
}

function App(props) {
    return (
    <div className="moneymanager">
      <h1>Money Manager</h1>
        <Form 
          addIncome={addIncome}
        />
    </div>
  );
}

export default App;
