import React from 'react';

function Header(props) {
    return (
        <header>
            <h1>
                <span className="title">{props.title}</span>
                <span className="name">{props.name}</span>
            </h1>
        </header>
    )
}

export default Header;