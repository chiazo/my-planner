import React from "react";
import "./Header.css";

const Header = ({name}) => (
    <header className="head">
        <div className="site-title">
        <h2 >my Planner</h2>
        <h5 >optimize your day the easy way</h5>
        </div>
        

        <h5 className="name-tag">Welcome back, Chiazo!</h5>
    </header>
) 
// if there is no JS, use ()
// if there is JS, use {}

export default Header;