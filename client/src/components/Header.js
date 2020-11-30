import React from 'react';

/**
 * Renders a header.
 * @param {*} props Properties passed in from the parent.
 */
function Header(props) {
    return (
        <h1>
            <span className="title">{props.title}</span>
            <span className="name">{props.name}</span>
        </h1>
    )
}

export default Header;