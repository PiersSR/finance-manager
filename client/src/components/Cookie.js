import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Config from '../data/config';

export default function Cookie() {
    const isReturningUser = false;
    
    const [name, setName] = useState({
        firstName: "",
        surname: ""
    });

    const cookies = new Cookies();
    cookies.getAll();
    console.log(cookies.getAll);

    // Check for an existing cookie
    function checkCookie() {
        var username = cookies.get('userID');

        if (username != "") {
            isReturningUser = true;
        }
    }

    function handleChange(e) {
        e.preventDefault();

        const value = e.target.value;

        setName({
            ...name,
            [e.target.name]: value
        });
    }

    // Handles a user's first visit
    function handleSubmit(e) {
        e.preventDefault();
        
        fetch(Config.fetchURL + "getNextUserId")
            .then(response => response.json())
            .then(data => { 
                var userID = data[0].UserID;
                cookies.set(userID, name.firstName, name.surname);
            });

        isReturningUser = true;
    }

    var newUser = (
        <form onSubmit={handleSubmit}>
            <label>Please enter your name: </label>
            <input
                type="text"
                name="firstName"
                value={name.firstName}
                onChange={handleChange}
                placeholder="First name"
            >
            </input>
            <input
                type="text"
                name="surname"
                value={name.surname}
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
        <p>Welcome back {name.firstName} {name.surnmame}!</p>
    )
    
    return isReturningUser ? returnUser : newUser;
}