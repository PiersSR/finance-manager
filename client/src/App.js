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
import Cookies from 'universal-cookie';

function App(props) {
	const cookies = new Cookies();
	var cookie = cookies.get('user');
	const [loading, setLoading] = useState(true);
	const [income, setIncome] = useState([{
		Id: null,
		Income: 'N/A',
		Category: "General"
	}]);

	const [expenses, setExpense] = useState([{
		Id: null,
		Expense: 'N/A',
		Category: "General"
	}])

    const [summary, setSummary] = useState({
		Summary: 0,
		TotalIncome: 0,
		TotalExpenses: 0
	});

	const [isNewUser, setNewUser] = useState({value: true, isSet: false});
    const [nextUserId, setNextUserId] = useState(null);
    const [user, setUser] = useState({
            userId: null,
            firstName: "",
            surname: "",
            isSet: false
        }
	);

	if (!isNewUser.isSet) {
		setNewUser({ value: cookie === undefined ? true : false, isSet: true});
	}

	if (!isNewUser.value) {
		cookie = cookies.get('user');
		if(!user.isSet) {
			setUser({ 
				userId: cookie.userId,
				firstName: cookie.firstName,
				surname: cookie.surname,
				isSet: true
			})
		}
	}

  	/// Handles changes of the input fields
	function handleChange(e) {
		e.preventDefault();
      	const value = e.target.value;

      	setUser({
          	...user,
          	[e.target.name]: value
      	});
 	}
	
	/// Gets the next user id
	useEffect(() => {
		async function getValue() {
			const fetchURL = Config.fetchURL + 'user/';
			const response = await fetch(fetchURL);
			const body = await response.json();
	
			setNextUserId(body[0][0].UserID);
			setLoading(false);
		}
	
		getValue();
	}, [])

	/// Updates the summary values if income or expenses change
	useEffect(() => {
		getSummary();
	}, [income, expenses])


	/// Gets the summary values for the current user
	function getSummary() {
		var totalIncome = 0;
		var totalExpenses = 0;

		for (var i in income) {
			totalIncome += i.Amount;
		}

		for (var j in expenses) {
			totalExpenses += j.Amount;
		}

		setSummary(totalIncome - totalExpenses);
	}
	
	///  Gets the income and expenses value for the current user
	function getIncome() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "income/" + user.userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setIncome(body[0].map(
				(obj) => (
					{ amount: obj.Amount, category: obj.Category}
				)
			))
		}
		getValue();
	}

	function getExpense() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "expense/" + user.userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setExpense(body[0].map(
				(obj) => (
					{ amount: obj.Amount, category: obj.Category}
				)
			))
		}
		getValue();
	}
  
	/// @param categoryID: The selected category ID
	/// @param amount: The input amount
	/// @param frequencyID: The selected frequency
	/// Creates a POST request to add an income record
	function addIncome(amount, categoryId, frequencyId) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inAmount: amount,
				inCategoryID: categoryId,
				inFrequencyID: frequencyId
			})
		}

		fetch(Config.fetchURL + "income/" + user.userId, requestOptions).then((response) => getIncome());
  	}

	/// @param categoryID: The selected category ID
	/// @param amount: The input amount
	/// @param frequencyID: The selected frequency
	/// Creates a POST request to add an expense record
	function addExpense(amount, categoryId, frequencyId) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inUserID: user.userId,
				inAmount: amount,
				inCategoryID: categoryId,
				inFrequencyID: frequencyId
			})
		}

		fetch(Config.fetchURL + "expense/" + user.userId, requestOptions).then((response) => getExpense());
	}

	/// @param userID: The current userID
	/// @param categoryID: The selected category ID
	/// @param amount: The input amount
	/// @param frequencyID: The selected frequency
	/// Creates a POST request to add an income record
	function addUser(firstName, surname) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inFirstName: firstName,
				inSurname: surname
			})
		}

		fetch(Config.fetchURL + "user", requestOptions);
	}
  
	/// Handles a user's first visit
	function handleSubmit(e) {
		e.preventDefault();

		cookies.set('user', { 
			userId: nextUserId,
			firstName: user.firstName,
			surname: user.surname
			}
		);
		
		addUser(user.firstName, user.surname);
		setNewUser({value: false});
	}

	var newUser = (
		<form onSubmit={handleSubmit}>
			<label>Please enter your name: </label>
			<input
				type="text"
				name="firstName"
				value={user.firstName}
				onChange={handleChange}
				placeholder="First name"
			>
			</input>
			<input
				type="text"
				name="surname"
				value={user.surname}
				onChange={handleChange}
				placeholder="Surname"
			>
			</input>
			<button type="submit">
				Submit
			</button>
		</form>
	);

	var returnUser = (
		<div className="moneymanager">
			<h1>Money management tool - {user.firstName}</h1>
			<h2>Summary</h2>
			<Summary
				label="Summary"
				summary={summary}
			/>
			<h2>Income</h2>
			<Form 
				type="addIncome"
				userId={user.userId}
				addIncome={addIncome}
			/>
			<h2>Expenses</h2>
			<Form
				type="addExpense"
				userId={user.userId}
				addExpense={addExpense}
			/>
			<Charts
			summary={summary}
			/>
			<DataTables
				income={income}
				expenses={expenses}
			/>
		</div>
	);

  	return isNewUser.value ? newUser : returnUser;
}

export default App;
