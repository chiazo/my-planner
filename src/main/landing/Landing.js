import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";
import TaskList from "../tasks/TaskList";
import * as dateFns from "date-fns";
// import TaskForm from "../tasks/TaskForm";
import EditableTable from "../tasks/EditableTable";

class Landing extends React.Component {
    state = {
        taskObjects: [],
        showTaskInput: true,
        showCalendar: false,
        showTaskList: false,
        freeHours: [],
        currDate: new Date(),
        allDivs: [],
        divMap: new Map()
    }

    containsHour = hour => {
        return this.state.freeHours.some(item => item.getTime() === hour.getTime());
    }


    onHourClick = (hour, div) => {
        var updatedHours = this.state.freeHours.concat(hour);
        var updatedDivs;
        if (this.state.divMap.has(this.state.currDate)) {
            updatedDivs = this.state.divMap.get(this.state.currDate).concat(div);
        } else {
            updatedDivs = [div];
        }
        var allKnownDivs = this.state.allDivs.concat(div);

        if (this.containsHour(hour)) {
            updatedHours = this.state.freeHours.filter(item => item.getTime() !== hour.getTime());
            if (this.state.divMap.has(this.state.currDate)) {
                updatedDivs = this.state.divMap.get(this.state.currDate).filter(item => item !== div);
            }
        }

        var newMap = this.state.divMap.set(this.state.currDate, updatedDivs);

        this.setState({
            freeHours: updatedHours,
            divMap: newMap,
            allDivs: allKnownDivs
        })

        if (!div.style.backgroundColor) {
            div.style.backgroundColor = "#7db3f0";
        } else {
            div.style.backgroundColor = "";
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.freeHours);
    }

    handleTaskSubmit = (taskList) => {

        let { taskObjects } = this.state;

        for (let task of taskList) {
            if (taskObjects.indexOf(task) === -1) {
                taskObjects.push(task);
            }
        }

        // console.log(taskObjects);
        this.setState({
            showTaskInput: false,
            showCalendar: true,
            showTaskList: true
        })

        window.getSelection().removeAllRanges();

    }

    changeDivColors = () => {
        this.state.allDivs.forEach(d => {
            d.style.backgroundColor = "";
        })
    }


    nextDay = () => {
        this.setState({
            currDate: dateFns.addDays(this.state.currDate, 1)
        });

        this.changeDivColors();
    };

    prevDay = () => {
        this.setState({
            currDate: dateFns.subDays(this.state.currDate, 1)
        });

        this.changeDivColors();
    };

    handleScheduleSubmit() {
        console.log("SCHEDULE LOADING");
        // how to load schedule
        // 1. loop through free hours
        // 2. add task to that hour 
        // 3. if not enough space, move onto next free hour

    }

    // goBack() { // back button
    //     this.setState({
    //         showTaskInput: true,
    //         showCalendar: false,
    //         showTaskList: false
    //     })
    //     console.log("um what is going on");
    //     window.getSelection().removeAllRanges();
    // }

    render() {
        return (
            <div className="landing">
                {this.state.showTaskInput ?
                    <EditableTable handleTaskSubmit={this.handleTaskSubmit} /> : null}
                {/* {this.state.showTaskList ? <TaskList tasks={this.state.taskObjects} /> : null} */}
                {this.state.showCalendar ?
                    <div>
                        <div className="wrapper">
                        <div className="column">
                            <CalendarDay currDate={this.state.currDate}
                            allDivs={this.state.allDivs} divMap={this.state.divMap}
                            onHourClick={this.onHourClick.bind(this)}/>
                        </div>
                        <div className="column">
                            <TaskList tasks={this.state.taskObjects} />
                        </div>
                    </div>
                    <button type="button" name="submit_b" id="submit_b" onClick={this.handleScheduleSubmit} >Submit!</button>
                    </div>
                    : null}

            </div>
        )
    }
}

export default Landing;