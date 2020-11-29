import './App.css';
import Config from './data/config.js';
import Form from "./components/Form";
import Summary from "./components/Summary";
import React, { useEffect, useRef, useState } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import Cookies from 'universal-cookie';
import Header from './components/Header'

function App(props) {
	const cookies = new Cookies();
	var cookie = cookies.get('user');
	const [loading, setLoading] = useState(true);
	const [groupedIncome, setGroupedIncome] = useState([{
		Id: null,
		Income: "N/A",
		Category: "N/A",
		Frequency: "N/A"
	}]);

	const [groupedExpenses, setGroupedExpenses] = useState([{
		Id: null,
		Income: "N/A",
		Category: "N/A",
		Frequency: "N/A"
	}]);

	const [income, setIncome] = useState([{
		Id: null,
		Income: "N/A",
		Category: "N/A",
		Frequency: "N/A"
	}]);

	const [expenses, setExpenses] = useState([{
		Id: null,
		Expense: "N/A",
		Category: "N/A",
		Frequency: "N/A"
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

	/// Gets the incomes and expenses
	useEffect(() => {
		getIncome();
		getExpenses();
		getGroupedIncome();
		getGroupedExpenses();
	}, [])

	/// Updated the summary values when income or expenses change
	useEffect(() => {
		getSummary();
	}, [income, expenses]);


	/// Gets the summary values for the current user
	function getSummary() {
		var totalIncome = 0;
		var totalExpenses = 0;

		for (var i in income) {
			totalIncome += income[i].Amount;
		}

		for (var j in expenses) {
			totalExpenses += expenses[j].Amount;
		}

		setSummary({
			Summary: (totalIncome - totalExpenses).toFixed(2),
			TotalIncome: totalIncome.toFixed(2),
			TotalExpenses: totalExpenses.toFixed(2)
		});
	}
	
	///  Gets the grouped income value for the current user
	function getGroupedIncome() {
		async function getValue() {
			const fetchURL = Config.fetchURL + "income/groups/" + user.userId;
			const response = await fetch(fetchURL);
			const body = await response.json();
			setGroupedIncome(body[0].map(
				(obj) => ({ 
					Id: obj.ID,
					Amount: obj.Amount,
					Category: obj.Category,
					Frequency: obj.Frequency 
				})
			))
		}
		getValue();
	}

	///  Gets the grouped income value for the current user
	function getGroupedExpenses() {
		async function getValue() {
			const fetchURL = Config.fetchURL + "expense/groups/" + user.userId;
			const response = await fetch(fetchURL);
			const body = await response.json();
			setGroupedExpenses(body[0].map(
				(obj) => ({ 
					Id: obj.ID,
					Amount: obj.Amount,
					Category: obj.Category,
					Frequency: obj.Frequency 
				})
			))
		}
		getValue();
	}

	///  Gets the income value for the current user
	function getIncome() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "income/" + user.userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setIncome(body[0].map(
				(obj) => ({ 
					Id: obj.IncomeID,
					Amount: obj.Amount,
					Category: obj.Category,
					Frequency: obj.Frequency 
				})
			))
		}
		getValue();
	}

	/// Gets the expenses value for the current user
	function getExpenses() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "expense/" + user.userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setExpenses(body[0].map(
				(obj) => ({
					Id: obj.ExpenseID,
					Amount: obj.Amount,
					Category: obj.Category,
					Frequency: obj.Frequency
				})
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

		fetch(Config.fetchURL + "income/" + user.userId, requestOptions)
			.then((response) => {
				getIncome();
				getGroupedIncome();
			});
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

		fetch(Config.fetchURL + "expense/" + user.userId, requestOptions)
			.then((response) => {
				getExpenses();
				getGroupedExpenses();
			});
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
		<section className="container">
			<Header 
				title={"Money management tool"}
				name={user.firstName}
			/>
			<div className="forms">
				<div className="form">
					<h2>Summary</h2>
					<Summary
						label="Summary"
						summary={summary}
					/>
				</div>
				<div className = "form">
					<h2>Income</h2>
					<Form 
						subType="addIncome"
						type="add"
						userId={user.userId}
						addIncome={addIncome}
					/>
					</div>
				<div className="form">
					<h2>Expenses</h2>
					<Form
						subType="addExpense"
						type="add"
						userId={user.userId}
						addExpense={addExpense}
					/>
				</div>
			</div>
			<div className="charts">
				<div className="chart">
					<Chart
						type={"pieChart"}
						data={summary}
					/>
				</div>
				<div className="chart">
					<Chart
						type={"groupedPieChart"}
						data={groupedIncome}
					/>
				</div>
				<div className="chart">
					<Chart
						type={"groupedPieChart"}
						data={groupedExpenses}
					/>
				</div>
			</div>
			<div className="tables">
				<div className="table">
					<Table
						title={"Income"}
						type={"Income"}
						data={income}
						selectableRows={true}
					/>
				</div>
				<div className="table">
					<Table
						title={"Expenses"}
						type={"Expenses"}
						data={expenses}
						selectableRows={true}
					/>
				</div>
				<div className="table">
					<Table
						title="Income grouped by Category and Frequency"
						type={"Income"}
						data={groupedIncome}
						selectableRows={false}
					/>
				</div>
				<div className="table">
					<Table
						title={"Expenses grouped by Category and Frequency"}
						type={"Expenses"}
						data={groupedExpenses}
						selectableRows={false}
					/>
				</div>
			</div>
		</section>
	);

  	return isNewUser.value ? newUser : returnUser;
}

export default App;
