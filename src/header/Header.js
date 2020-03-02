import React from "react";
import "./Header.css";

const Header = ({name}) => (
    <header className="row head">
        <div className="column">
        <h1 >my Planner</h1>
        <h4 >optimize your day</h4>
        </div>
        

        <h5 className="column name-tag">Welcome back, Chiazo!</h5>
    </header>
) 
// if there is no JS, use ()
// if there is JS, use {}

export default Header;