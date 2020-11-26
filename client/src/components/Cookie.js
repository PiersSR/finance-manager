import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Config from '../data/config';

function Cookie() {
    const cookies = new Cookies();
    var [nextUserID, setNextUserID] = useState({ userId: "" });
    var userId;
    const [name, setName] = useState({
            firstName: "",
            surname: "",
            isSet: false
        }
    );
    var [isNewUser, setUser] = useState(true);
    
    // Check for an existing cookie
    function checkCookie() {
        var firstName = cookies.get('user').firstName;
        var surname = cookies.get('user').surname;
        if(!name.isSet) {
            setName({ firstName: firstName, surname: surname, isSet: true })
            userId = cookies.get('user').userId;
        }

        return false;
    }
    
    
    isNewUser = cookies.get('user') == undefined ? true : checkCookie();

    // Handles changes of the input fields
    function handleChange(e) {
        e.preventDefault();

        const value = e.target.value;

        setName({
            ...name,
            [e.target.name]: value
        });
    }

    useEffect(() => {
        async function getValues() {
            const fetchURL = 'http://localhost:9000/getNextUserID';
            const response = await fetch(fetchURL);
            const body = await response.json();

            setNextUserID(body[0].map(
                (obj) => (
                    { UserID: obj.UserID }
                ) 
            ));
        }
        getValues();
    }, []);

    // Handles a user's first visit
    function handleSubmit(e) {
        e.preventDefault();

        cookies.set('user', { 
            userId: nextUserID[0].UserID,
            firstName: name.firstName,
            surname: name.surname
            }
        );
        
        addUser(nextUserID[0].UserID, name.firstName, name.surname);
        setUser(false);
        isNewUser = false;
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
                firstName: firstName,
                surname: surname
            })
        }

        fetch(Config.fetchURL + "addUser", requestOptions);
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
        <p>Welcome back {name.firstName}!</p>
    )
    
    return isNewUser ? newUser : returnUser;
}

export default Cookie;