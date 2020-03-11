import React from "react";
import "./TaskList.css";
import Task from "./Task";
import TaskInput from "./TaskInput";

const tasks = [
    {
        "id": 0,
        "name": "clean my room",
        "complete": false,
        "subtasks": [],
        "est": 30
    },
    {
        "id": 1,
        "name": "wash my hair",
        "complete": false,
        "subtasks": [],
        "est": 60
    },
    {
        "id": 2,
        "name": "write english essay",
        "complete": false,
        "subtasks": [],
        "est": 120
    }
];

class TaskList extends React.Component {
    render() {
        return(
            <section>
                <div>
                    <TaskInput/>
                </div>
                {/* <ul className="task-list">
                    {
                        tasks.map( (task) => (
                            <Task key={task.id.toString()} name={task.name}/>
                        ))
                    }
                </ul> */}
            </section>
        )
    }
}

export default TaskList;

