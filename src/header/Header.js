import React from "react";
import "./Header.css";

const Header = ({name}) => (
    <header className="row head">
        <div className="column">
        <h2 >my Planner</h2>
        <h5 >optimize your day the easy way</h5>
        </div>
        

        <h5 className="column name-tag">Welcome back, Chiazo!</h5>
    </header>
) 
// if there is no JS, use ()
// if there is JS, use {}

export default Header;