import React from "react";
import "./TaskList.css";
import Task from "./Task";

class TaskList extends React.Component {
    render() {
        return(
            <section>
                <ul className="task-list">
                    {
                        this.props.tasks.map( (task) => (
                            <Task key={task.id.toString()} name={task.name}
                            est={task.est} category={task.category}/>
                        ))
                    }
                </ul>
            </section>
        )
    }
}

export default TaskList;

