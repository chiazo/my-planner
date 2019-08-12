"use strict";
// Task Object
var Task = /** @class */ (function () {
    function Task(id, text, complete, time) {
        this.id = id;
        this.text = text;
        this.complete = complete;
        this.time = time;
    }
    return Task;
}());
// handles all the data
var Model = /** @class */ (function () {
    function Model() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
    Model.prototype.addTask = function (input, inputTime) {
        var currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: inputTime === undefined ? 20 : inputTime,
        };
        this.tasks.push(currTask);
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.editTaskText = function (id, updatedInput) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: updatedInput, complete: task.complete, time: task.time } : task;
        });
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.editTaskTime = function (id, updatedTime) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: task.text, complete: task.complete, time: updatedTime } : task;
        });
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.deleteTask = function (id) {
        this.tasks = this.tasks.filter(function (task) {
            return task.id !== id;
        });
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.toggleTask = function (id) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: task.text, complete: !task.complete, time: task.time } : task;
        });
        this.onTaskListChanged(this.tasks);
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.bindTaskListChanged = function (callback) {
        this.onTaskListChanged = callback;
        this.updateLocalStorage(this.tasks);
    };
    Model.prototype.updateLocalStorage = function (tasks) {
        this.onTaskListChanged(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    return Model;
}());
// handles the DOM, HTML, and CSS
var View = /** @class */ (function () {
    function View() {
        var _this = this;
        this.bindCalcTime = function (handler) {
        };
        this.bindEditTaskTime = function (handler) {
            _this.taskList.addEventListener("focusout", function (e) {
                if (_this.tempTaskTime) {
                    var id = parseInt(e.target.parentElement.id);
                    handler(id, _this.tempTaskTime);
                    _this.tempTaskTime = 20;
                }
            });
        };
        this.app = this.getElement("#root");
        this.title = this.createElement("h1");
        this.title.textContent = "My Planner";
        this.title.style.textAlign = "center";
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add Task";
        this.input.name = "task";
        this.time = this.createElement("input");
        this.time.type = "number";
        this.time.placeholder = "20 mins";
        this.time.name = "time";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.taskList = this.createElement("ul", "todo-list");
        this.timeFreeQuestion = this.createElement("h3");
        this.form2 = this.createElement("form");
        this.timeFreeQuestion.type = "text";
        this.timeFreeQuestion.textContent = "How much freetime do you have right now?";
        this.timeFreeQuestion.name = "freetime";
        this.hours = document.createElement("input");
        this.hours.type = "number";
        this.hours.placeholder = "hours";
        this.minutes = document.createElement("input");
        this.minutes.type = "number";
        this.minutes.placeholder = "minutes";
        this.submitButton2 = this.createElement("button");
        this.submitButton2.textContent = "Calculate Time for Tasks!";
        this.totalTime = 0;
        this.finalMessage = document.createElement("p");
        this.form2.append(this.timeFreeQuestion, this.hours, this.minutes, this.submitButton2);
        this.form.append(this.input, this.time, this.submitButton);
        this.app.append(this.title, this.form, this.taskList, this.timeFreeQuestion, this.finalMessage, this.form2);
        this.tempTaskText = "";
        this.tempTaskTime = 0;
        this.updateTempState();
    }
    View.prototype.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    };
    View.prototype.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };
    View.prototype.displayTasks = function (tasks) {
        var _this = this;
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }
        if (tasks.length === 0) {
            var p = this.createElement("p");
            p.textContent = "No tasks yet? Start dumping your to-dos!";
            this.taskList.append(p);
        }
        else {
            tasks.forEach(function (task) {
                var li = _this.createElement("li");
                li.id = task.id;
                var checkbox = _this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.complete;
                var span = _this.createElement("span");
                span.contentEditable = true;
                span.classList.add("editable");
                var setTime = _this.createElement("input");
                setTime.type = "number";
                setTime.value = task.time;
                var timeText = _this.createElement("p");
                timeText.innerText = " "; // add word "mins" later
                if (task.complete) {
                    var strike = _this.createElement("s");
                    strike.textContent = task.text;
                    span.append(strike);
                }
                else {
                    span.textContent = task.text;
                }
                var deleteButton = _this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, setTime, timeText, deleteButton);
                _this.taskList.append(li);
            });
        }
    };
    View.prototype.bindAddTask = function (handler) {
        var _this = this;
        this.form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (_this.getTaskText() && _this.getTaskTime()) {
                handler(_this.getTaskText(), _this.getTaskTime());
                _this.resetInput();
                _this.resetTime();
            }
        });
    };
    View.prototype.bindDeleteTask = function (handler) {
        this.taskList.addEventListener("click", function (e) {
            if (e.target.className === "delete") {
                var id = parseInt(e.target.parentElement.id);
                handler(id);
            }
        });
    };
    View.prototype.bindToggleTask = function (handler) {
        this.taskList.addEventListener("change", function (e) {
            if (e.target.type === "checkbox") {
                var id = parseInt(e.target.parentElement.id);
                handler(id);
            }
        });
    };
    View.prototype.updateTempState = function () {
        var _this = this;
        this.taskList.addEventListener("input", function (e) {
            if (e.target.className === "editable" && e.target.type === "text") {
                _this.tempTaskText = e.target.innerText;
            }
            else if (e.target.type === "number") {
                _this.tempTaskTime = e.target.value;
            }
        });
        this.form2.addEventListener("submit", function (e) {
            e.preventDefault();
            _this.finalMessage.textContent = "You should be able to complete " + _this.totalTime + " tasks today!";
        });
    };
    View.prototype.getTaskText = function () {
        return this.input.value;
    };
    View.prototype.getTaskTime = function () {
        return this.time.value;
    };
    View.prototype.resetInput = function () {
        this.input.value = "";
    };
    View.prototype.resetTime = function () {
        this.time.value = "";
    };
    View.prototype.bindEditTaskText = function (handler) {
        var _this = this;
        this.taskList.addEventListener("focusout", function (e) {
            if (_this.tempTaskText) {
                var id = parseInt(e.target.parentElement.id);
                handler(id, _this.tempTaskText);
                _this.tempTaskText = "";
            }
        });
    };
    return View;
}());
var Controller = /** @class */ (function () {
    function Controller(model, view) {
        var _this = this;
        this.onTaskListChanged = function (tasks) {
            _this.view.displayTasks(tasks);
        };
        this.handleAddTask = function (input, time) {
            if (time === undefined) {
                time = 20;
            }
            _this.model.addTask(input, time);
        };
        this.handleEditTaskText = function (id, input) {
            _this.model.editTaskText(id, input);
        };
        this.handleEditTaskTime = function (id, time) {
            _this.model.editTaskTime(id, time);
        };
        this.handleDeleteTask = function (id) {
            _this.model.deleteTask(id);
        };
        this.handleToggleTask = function (id) {
            _this.model.toggleTask(id);
        };
        this.model = model;
        this.view = view;
        this.onTaskListChanged(this.model.tasks);
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindDeleteTask(this.handleDeleteTask);
        this.view.bindToggleTask(this.handleToggleTask);
        this.model.bindTaskListChanged(this.onTaskListChanged);
        this.view.bindEditTaskText(this.handleEditTaskText);
        this.view.bindEditTaskTime(this.handleEditTaskTime);
    }
    return Controller;
}());
var app = new Controller(new Model(), new View());
