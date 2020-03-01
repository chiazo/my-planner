import React from "react";
import "./Header.css";

const Header = ({name}) => (
    <header>
        <h1>my Planner</h1>
        <h4>optimize your day</h4>

        <h5>Welcome back, {name}!</h5>
    </header>
) 
// if there is no JS, use ()
// if there is JS, use {}

export default Header;