import React from "react";
import "./Task.css";

const Task = ({ name }) => (
    <li className="task">{name}</li>
);

export default Task;