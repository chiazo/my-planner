import React from "react";
import "./Landing.css";
// import CalendarDay from "../calendar/Calendar-Day";
// import TaskList from "../tasks/TaskList";
// import TaskForm from "../tasks/TaskForm";
import EditableTable from "../tasks/EditableTable";

class Landing extends React.Component {
    

    render() {
        return(
            <div className="landing">
                <EditableTable/>
                {/* <TaskForm/> */}
                {/* <TaskList/> */}
                {/* <CalendarDay/> */}
            </div>
        )
    }
}

export default Landing;