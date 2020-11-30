import './App.css';
import Config from './data/config.js';
import Form from "./components/Form";
import Summary from "./components/Summary";
import React, { useEffect, useRef, useState } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import Cookies from 'universal-cookie';
import Header from './components/Header'
import CategoryForm from './components/CategoryForm'
import FrequencyForm from './components/FrequencyForm'

function App(props) {
	const cookies = new Cookies();
	const [loading, setLoading] = useState(true);
	const [isNewUser, setNewUser] = useState(true);
	const [nextUserId, setNextUserId] = useState(null);

	const [categories, setCategories] = useState([{
		Id: null,
		CategoryId: null,
		Value: "N/A"
	}])

	const [frequencies, setFrequencies] = useState([{
		Id: null,
		FrequencyId: null,
		Value: "N/A"
	}])

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
		CategoryId: null,
		Category: "N/A",
		FrequencyId: null,
		Frequency: "N/A"
	}]);

	const [expenses, setExpenses] = useState([{
		Id: null,
		Expense: "N/A",
		CategoryId: null,
		Category: "N/A",
		FrequencyId: null,
		Frequency: "N/A"
	}])

    const [summary, setSummary] = useState([{
		Summary: 0,
		TotalIncome: 0,
		TotalExpenses: 0
	}]);
	
    const [user, setUser] = useState({
            userId: null,
            firstName: "",
            surname: "",
            isSet: false
        }
	);
	
	/**
	 * Checks whether the user is returning or new.
	 */
	useEffect(() => {
		var cookie = cookies.get('user');
		console.log(cookie);
		if (cookie === undefined) {
			const fetchURL = Config.fetchURL + 'user/';
			fetch(fetchURL)
				.then((response) => response.json())
				.then((data) => {
					setNextUserId(data[0][0].UserID);
				})
		} else {
			setUser({ userId: cookie.userId, firstName: cookie.firstName, surname: cookie.surname })
			getAllValues();
			setNewUser(false);
		}

		setLoading(false);
	}, [])

	/**
	 * Gets the incomes and expenses on initial load.
	 */
	function getAllValues() {
		getCategories();
		getFrequencies();
		getIncome();
		getExpenses();
		getGroupedIncome();
		getGroupedExpenses();
		setLoading(false);
	}

	/**
	 * Updates the summary values when income or expenses change.
	 */
	useEffect(() => {
		getSummary();
	}, [income, expenses]);


	/**
	 * Gets the current user's summary.
	 */
	function getSummary() {
		var totalIncome = 0;
		var totalExpenses = 0;

		for (var i in income) {
			totalIncome += income[i].Amount;
		}

		for (var j in expenses) {
			totalExpenses += expenses[j].Amount;
		}

		setSummary([{
			Summary: (totalIncome - totalExpenses).toFixed(2),
			TotalIncome: totalIncome.toFixed(2),
			TotalExpenses: totalExpenses.toFixed(2)
		}]);
	}
	
	/**
	 * Gets the current users categories.
	*/ 
	function getCategories() {
		async function getValues() {
            const fetchURL = Config.fetchURL + "categories/" + cookies.get('user').userId;
            const response = await fetch(fetchURL);
            const body = await response.json();

            setCategories(body[0].map(
                (obj) => (
                    { 
						Id: obj.CategoryID,
						CategoryId: obj.CategoryID,
						Value: obj.Category
					}
                ) 
            ));
        }
        getValues();
	}

	/** 
	 * Gets the current user's frequencies.
	*/
	function getFrequencies() {
		async function getValues() {
            const fetchURL = Config.fetchURL + "frequencies/" + cookies.get('user').userId;
            const response = await fetch(fetchURL);
            const body = await response.json();

            setFrequencies(body[0].map(
                (obj) => (
                    { 
						Id: obj.FrequencyID,
						FrequencyId: obj.FrequencyID,
						Value: obj.Frequency
					}
                ) 
            ));
        }
        getValues();
	}

	/**
	 * Gets the grouped income value for the current user.
	 */
	function getGroupedIncome() {
		async function getValue() {
			const fetchURL = Config.fetchURL + "income/groups/" + cookies.get('user').userId;
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

	/**
	 * Gets the grouped expenses for the current user.
	 */
	function getGroupedExpenses() {
		async function getValue() {
			const fetchURL = Config.fetchURL + "expenses/groups/" + cookies.get('user').userId;
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

	/**
	 * Gets the current user's income.
	 */
	function getIncome() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "income/" + cookies.get('user').userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setIncome(body[0].map(
				(obj) => ({ 
					Id: obj.IncomeID,
					Amount: obj.Amount,
					CategoryId: obj.CategoryID,
					Category: obj.Category,
					FrequencyId: obj.FrequencyID,
					Frequency: obj.Frequency
				})
			))
		}
		getValue();
	}

	/**
	 * Gets the current user's expenses.
	 */
	function getExpenses() {
		async function getValue() {
            const fetchURL = Config.fetchURL + "expenses/" + cookies.get('user').userId;
            const response = await fetch(fetchURL);
            const body = await response.json();
			setExpenses(body[0].map(
				(obj) => ({
					Id: obj.ExpenseID,
					Amount: obj.Amount,
					CategoryId: obj.CategoryID,
					Category: obj.Category,
					FrequencyId: obj.FrequencyID,
					Frequency: obj.Frequency
				})
			))
		}
		getValue();
	}
  
	/**
	 * Creates a POST request to add an income record.
	 * @param {Number} amount The input amount.
	 * @param {Int} categoryId The selected category id.
	 * @param {Int} frequencyId The selected frequency id.
	 */
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

	/**
	 * Creates a POST request to add an expense record.
	 * @param {Number} amount The input amount.
	 * @param {Int} categoryId The selected category id.
	 * @param {Int} frequencyId The selected frequency id.
	 */
	function addExpense(amount, categoryId, frequencyId) {
		console.log(cookies.get('user').userId)
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inUserID: cookies.get('user').userId,
				inAmount: amount,
				inCategoryID: categoryId,
				inFrequencyID: frequencyId
			})
		}

		fetch(Config.fetchURL + "expenses/" + cookies.get('user').userId, requestOptions)
			.then((response) => {
				getExpenses();
				getGroupedExpenses();
			});
	}

	/**
	 * Creates a POST request to add a user record.
	 * @param {string} firstName The input first name.
	 * @param {string} surname The input surname.
	 */
	function addUser(firstName, surname) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				inFirstName: firstName,
				inSurname: surname
			})
		}

		fetch(Config.fetchURL + "user", requestOptions)
			.then((response) => {
				getAllValues();
			})
	}

	/**
	 * Handles changes to form input fields.
	 * @param {*} e The event's data.
	 */
	function handleChange(e) {
		e.preventDefault();
      	const value = e.target.value;

      	setUser({
          	...user,
          	[e.target.name]: value
      	});
	 }
	 
	/**
	 * Handles form submission.
	 * @param {*} e The event's data.
	 */
	function handleSubmit(e) {
		e.preventDefault();

		cookies.set('user', { 
			userId: nextUserId,
			firstName: user.firstName,
			surname: user.surname
			}
		);
		
		addUser(user.firstName, user.surname);
		setNewUser(false);
	}

	var newUser = (
		<form 
			className="welcomePage"
			onSubmit={handleSubmit}
		>
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
		<body>
			<div className="titleBar">
				<Header
					title={"Money management tool"}
					name={user.firstName}
				/>
			</div>
			<div className="container">
				<section className="forms">
					<div className="formElement">
						<h2>Summary</h2>
						<Summary
							label="Summary"
							summary={summary[0]}
						/>
					</div>
					<div className = "formElement">
						<h2>Income</h2>
						<Form 
							type="add"
							subType="income"
							userId={user.userId}
							addIncome={addIncome}
							frequencies={frequencies}
							categories={categories}
						/> 
					</div>
					<div className="formElement">
						<h2>Expenses</h2>
						<Form
							type="add"
							subType="expenses"
							userId={user.userId}
							addExpense={addExpense}
							frequencies={frequencies}
							categories={categories}
						/> 
					</div>
					<div className="formElement">
						<h2>Categories</h2>
						<CategoryForm
							userId={user.userId}
							data={categories}
							getCategories={getCategories}
						/>
						<Table
							title={""}
							dense={true}
							type={"categories"}
							className={"table"}
							data={categories}
							selectableRows={true}
							scrollHeight="7vh"
							userId={user.userId}
						/>
					</div>
					<div className="formElement">
						<h2>Frequencies</h2>
						<FrequencyForm
							userId={user.userId}
							data={frequencies}
							getFrequencies={getFrequencies}
						/>
						<Table
							title={""}
							dense={true}
							type={"frequencies"}
							className={"table"}
							data={frequencies}
							selectableRows={true}
							scrollHeight="7vh"
							userId={user.userId}
							/>
					</div>
				</section>
				<section className="charts">
					<h2>Summary of Total income and expenses</h2>
					{ 
						summary.length ?
							<Chart
								type={"pieChart"}
								data={summary}
							/>
						: 
							<div className="chart">
								<h2>No Data</h2>
							</div>
					}
					<h2>Breakdown of income grouped by category</h2>
					{
						groupedIncome.length 
						?
							<Chart
								type={"groupedPieChart"}
								data={groupedIncome}
							/>
						: 
							<div className="chart">
								<h2>No Data</h2>
							</div>
					}
					<h2>Breakdown of expenses grouped by category</h2>
					{
						groupedExpenses.length ?
							<Chart
								type={"groupedPieChart"}
								data={groupedExpenses}
							/>
						:
							<div className="chart">
								<h2 className="noData">No Data</h2>
							</div>
					}
				</section>
				<section className="tables">
					<div className="table">
						<Table
							title={"Income"}
							dense={true}
							type={"income"}
							data={income}
							selectableRows={true}
							scrollHeight="15vh"
							userId={user.userId}
						/>
					</div>
					<div className="table">
						<Table
							title={"Expenses"}
							dense={true}
							type={"expenses"}
							data={expenses}
							selectableRows={true}
							scrollHeight="15vh"
							userId={user.userId}
						/>
					</div>
					<div className="table">
						<Table
							title="Income grouped by Category and Frequency"
							dense={true}
							type={"income"}
							data={groupedIncome}
							selectableRows={false}
							scrollHeight="15vh"
							userId={user.userId}
						/>
					</div>
					<div className="table">
						<Table
							title={"Expenses grouped by Category and Frequency"}
							dense={true}
							type={"expenses"}
							data={groupedExpenses}
							selectableRows={false}
							scrollHeight="15vh"
							userId={user.userId}
						/>
					</div>
				</section>
			</div>
		</body>
	);

  	return isNewUser ? newUser : returnUser;
}

export default App;
