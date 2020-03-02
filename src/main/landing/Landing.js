import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";
import CalendarWeek from "../calendar/Calendar-Week";

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