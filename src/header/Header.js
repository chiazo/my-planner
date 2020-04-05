import React from "react";
import "./Header.css";

const Header = ({name}) => (
    <header className="head">
        <div>
        <div className="site-title">
        <h2 >my Planner</h2>
        <h6 >optimize your day the easy way</h6>
        </div>
        
        <div>
        {/* <h5 className="name-tag">Welcome back, Chiazo!</h5> */}
        </div>
        </div>
        
    </header>
) 
// if there is no JS, use ()
// if there is JS, use {}

export default Header;