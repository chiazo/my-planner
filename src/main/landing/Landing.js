import React from "react";
import "./Landing.css";
import CalendarDay from "../calendar/Calendar-Day";
import TaskList from "../tasks/TaskList";
import * as dateFns from "date-fns";
import DaySchedule from "../calendar/DaySchedule";
import EditableTable from "../tasks/EditableTable";


class Landing extends React.Component {
    state = {
        taskList: [],
        showTaskInput: true,
        showInputCalendar: false,
        showTaskList: false,
        showDaySchedule: false,
        freeHours: [],
        currDate: new Date(),
        allDivs: [],
        divMap: new Map(),
        schedule: []
    }

    containsHour = hour => {
        return this.state.freeHours.some(item => +item === +hour);
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
            updatedHours = this.state.freeHours.filter(item => +item !== +hour);
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

    handleTaskSubmit = (tasks) => {

        let { taskList } = this.state;

        for (let task of tasks) {
            if (taskList.indexOf(task) === -1) {
                taskList.push(task);
            }
        }

        // console.log(taskList);
        this.setState({
            showTaskInput: false,
            showInputCalendar: true,
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

    refresh() {
        window.location.reload(false)
    }

    handleScheduleSubmit() {

        const { freeHours, schedule, taskList } = this.state;

        // mapping free hours to intial time & tasks
        for (let hour of freeHours) {
            // each object will have hour, availableTime, tasks
            let currHour = {
                hour: hour.valueOf(),
                availableTime: 60,
                tasks: []
            };

            let newSchedule = this.state.schedule;
            newSchedule.push(currHour);
            this.setState({
                schedule: newSchedule
            })
        }

        // filling schedule
        let i = 0, numOfTasks = taskList.length;
        let subTask, splitTask = false;
        for (let hour of schedule) {
            
            let task = taskList[i];
            if (hour.availableTime <= 0) continue;
            if (!task) break;

            while (hour.availableTime > 0 && i < numOfTasks) {
                let task = (splitTask) ? subTask : taskList[i];
                if (task.est <= hour.availableTime) {
                    hour.tasks.push(task);
                    hour.availableTime -= task.est;
                    splitTask = false;
                    i++;
                    task = taskList[i];
                } else {
                    let leftOverTime = task.est - hour.availableTime;
                    hour.tasks.push({
                        name: task.name,
                        est: hour.availableTime,
                        category: task.category,
                        id: task.id,
                    });

                    subTask = {
                        name: task.name,
                        est: leftOverTime,
                        category: task.category,
                        id: task.id,
                    };
                    splitTask = true;

                    hour.availableTime -= hour.availableTime;
                    break;
                    // break;
                }
            }
        }


        this.setState({
            showDaySchedule: true,
            showInputCalendar: false,
            showTaskList: false
        })

    }

    render() {
        return (
            <div className="landing">
                {this.state.showTaskInput ?
                    <EditableTable handleTaskSubmit={this.handleTaskSubmit} /> : null}
                {/* {this.state.showTaskList ? <TaskList tasks={this.state.taskList} /> : null} */}
                {this.state.showInputCalendar ?
                    <div>
                        <div className="wrapper">
                            <div className="column">
                                <CalendarDay currDate={this.state.currDate}
                                    allDivs={this.state.allDivs} divMap={this.state.divMap}
                                    onHourClick={this.onHourClick.bind(this)} />
                            </div>
                            <div className="column">
                                <TaskList tasks={this.state.taskList} />
                            </div>
                        </div>
                        <button type="button" name="submit_b" id="submit_b" onClick={this.handleScheduleSubmit.bind(this)} >Submit!</button>
                    </div>
                    : null}
                    {this.state.showDaySchedule ?
                    <div>
                        <div className="wrapper">
                        <div className="column">
                        <DaySchedule schedule={this.state.schedule} />
                        </div>
                    </div> <button type="button" name="refresh_b" id="refresh_b" onClick={this.refresh.bind(this)} >End Session</button>
                    </div> : null}

            </div>
        )
    }
}

export default Landing;