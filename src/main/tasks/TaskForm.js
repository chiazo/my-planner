import React from "react";
// import "../syndrome.css";
// import ContentEditable from "react-contenteditable";

class TaskForm extends React.Component {

    submitFormHandler = event => {
        event.preventDefault();
        console.log(this.refs.name.value);
    }

    render() {
        return(
            // <div className="form">
            //     <form onSubmit={this.submitFormHandler}>
            //         <div>
            //             <input type="text" name="task-name" ref="task-name"/>
            //         </div>
            //     </form>
            // </div>
            <div class="table">
                <div class="thead">
                    <tr class="tr">
                        <div class="td">Task Name</div>
                        <div class="td">Est. Time (mins)</div>
                        <div class="td">Category</div>
                    </tr>
                </div>
                <div class="tbody">
                    <form class="tr" id="task-form" method="post">
                        <span class="td"><input type="text" placeholder="Task Name"/></span>
                        <span class="td"><input type="number" value="20" placeholder="20 mins"/></span>
                        <span class="td"><select>
                            <option value="school" selected>School</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </select></span>
                    </form>
                    <div class="tr">
                        <span class="td"><input type="text" placeholder="Task Name"/></span>
                        <span class="td"><input type="number" placeholder="20 mins"/></span>
                        <span class="td"><select>
                            <option value="school" selected>School</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </select></span>
                    </div>
                    <div class="tr">
                        <span class="td"><input type="text" placeholder="Task Name"/></span>
                        <span class="td"><input type="number" placeholder="20 mins"/></span>
                        <span class="td"><select>
                            <option value="school" selected>School</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </select></span>
                    </div>
                    <button type="submit" name="submit_b" id="submit_b" form="task-form">Submit!</button>
                </div>
            </div>
        )
    }
}

export default TaskForm;