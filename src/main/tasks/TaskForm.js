// import React from "react";

// // import "../syndrome.css";
// // import ContentEditable from "react-contenteditable";
// // import Task from "./Task";

// class TaskForm extends React.Component {

//     state = {
//         currTaskName: "",
//         currTaskTime: 20,
//         currTaskCategory: "School",
//         tasks: []
//     }

//     componentDidUpdate(prevProps, prevState) {
//         // this.setState({
//         //     tasks: [...]
//         // })
//     }

//     handleTaskNameChange = e => {
//         this.setState({currTaskName: e.target.value});
//     }

//     handleTaskTimeChange = e => {
//         this.setState({currTaskTime: e.target.value});
//     }

//     handleTaskCategoryChange = e => {
//         this.setState({currTaskCategory: e.target.value});
//     }

//     render() {
//         const { currTaskName, currTaskTime, currTaskCategory } = this.state;
//         return(
//             <div className="table">
//                 <div className="thead">
//                     <tr className="tr">
//                         <div className="td">Task Name</div>
//                         <div className="td">Est. Time (mins)</div>
//                         <div className="td">Category</div>
//                     </tr>
//                 </div>
//                 <div className="tbody">
//                     <form className="tr" id="task-form">
//                         <span className="td"><input type="text" placeholder="Task Name" value={currTaskName} onChange={this.handleTaskNameChange}/></span>
//                         <span className="td"><input type="number" value="20" placeholder="20 mins" value={currTaskTime} onChange={this.handleTaskTimeChange}/></span>
//                         <span className="td"><select value={currTaskCategory} onChange={this.handleTaskCategoryChange}>
//                             <option value="school" selected>School</option>
//                             <option value="work">Work</option>
//                             <option value="personal">Personal</option>
//                         </select></span>
//                     </form>
//                     <div className="tr">
//                         <span className="td"><input type="text" placeholder="Task Name"/></span>
//                         <span className="td"><input type="number" placeholder="20 mins"/></span>
//                         <span className="td"><select>
//                             <option value="school" selected>School</option>
//                             <option value="work">Work</option>
//                             <option value="personal">Personal</option>
//                         </select></span>
//                     </div>
//                     <div className="tr">
//                         <span className="td"><input type="text" placeholder="Task Name"/></span>
//                         <span className="td"><input type="number" placeholder="20 mins"/></span>
//                         <span className="td"><select>
//                             <option value="school" selected>School</option>
//                             <option value="work">Work</option>
//                             <option value="personal">Personal</option>
//                         </select></span>
//                     </div>
//                     <button type="button" name="submit_b" id="submit_b" onClick={this.handleSubmit} form="task-form">Submit!</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default TaskForm;