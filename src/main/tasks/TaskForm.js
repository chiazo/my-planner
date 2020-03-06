import React from "react";
import "../tasks/TaskForm.css";
import ContentEditable from "react-contenteditable";

class TaskForm extends React.Component {

    submitFormHandler = event => {
        event.preventDefault();
        console.log(this.refs.name.value);
    }

    render() {
        return(
            <div className="form">
                <form onSubmit={this.submitFormHandler}>
                    <div>
                        <input type="text" name="task-name" ref="task-name"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default TaskForm;