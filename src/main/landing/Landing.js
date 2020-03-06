import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";
import TaskList from "../tasks/TaskList";

class Landing extends React.Component {
    render() {
        return(
            <div className="landing">
                <TaskList/>
                <CalendarDay/>
            </div>
        )
    }
}

export default Landing;