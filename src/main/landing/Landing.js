import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";

class Landing extends React.Component {
    render() {
        return(
            <div className="landing">
                <CalendarDay/>
            </div>
        )
    }
}

export default Landing;