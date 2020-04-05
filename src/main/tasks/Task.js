import React from "react";
import "./Task.css";
import "../syndrome.css";

const Task = ({ name, est, category }) => (
    <li className="task"><b>{name}</b> - {est} minutes - <u>{category}</u></li>
);

export default Task;