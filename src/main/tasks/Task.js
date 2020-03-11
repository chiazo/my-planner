import React from "react";
import "./Task.css";
import "../syndrome.css";

const Task = ({ name }) => (
    <li className="task">{name}</li>
);

export default Task;