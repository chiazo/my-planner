import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";
import TaskList from "../tasks/TaskList";
import TaskForm from "../tasks/TaskForm";
import EditableTable from "../tasks/EditableTable";

class Landing extends React.Component {
    state = {
        taskObjects: [],
        showTaskInput: true,
        showCalendar: false,
        showTaskList: false,
    }

    handleTaskSubmit = (taskList) => {

        let { taskObjects } = this.state;

        for (let task of taskList) {
            if (taskObjects.indexOf(task) === -1) {
                taskObjects.push(task);
            }
        }

        console.log(taskObjects);
        this.setState({
            showTaskInput: false,
            showCalendar: true,
            showTaskList: true
        })

        window.getSelection().removeAllRanges();

    }

    handleSubmit() {
        console.log("SCHEDULE LOADING")
    }

    goBack() {
        this.setState({
            showTaskInput: true,
            showCalendar: false,
            showTaskList: false
        })
        console.log("um what is going on");
        window.getSelection().removeAllRanges();
    }

    render() {
        return (
            <div className="landing">
                {this.state.showTaskInput ?
                    <EditableTable handleTaskSubmit={this.handleTaskSubmit} /> : null}
                {/* {this.state.showTaskList ? <TaskList tasks={this.state.taskObjects} /> : null} */}
                {this.state.showCalendar ?
                    <div className="wrapper">
                        <div className="column">
                            <CalendarDay />
                        </div>
                        <div className="column">
                            <TaskList tasks={this.state.taskObjects} />
                        </div>
                        <button type="button" name="submit_b" id="submit_b" onClick={this.handleSubmit} >Submit!</button>
                    </div>
                    : null}

            </div>
        )
    }
}

export default Landing;