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
        this.tasks = [
            { id: 1, text: "Message back Morehead", complete: false, time: 15 },
            { id: 2, text: "Finish adding transcripts to site", complete: false, time: 80 },
        ];
    }
    Model.prototype.addTask = function (input) {
        var currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: 20,
        };
        this.tasks.push(currTask);
    };
    Model.prototype.editTaskText = function (id, updatedInput) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: updatedInput, complete: task.complete, time: task.time } : task;
        });
    };
    Model.prototype.editTaskTime = function (id, updatedTime) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: task.text, complete: task.complete, time: updatedTime } : task;
        });
    };
    Model.prototype.deleteTask = function (id) {
        this.tasks = this.tasks.filter(function (task) {
            return task.id !== id;
        });
    };
    Model.prototype.toggleTask = function (id) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === id ? { id: task.id, text: task.text, complete: !task.complete, time: task.time } : task;
        });
    };
    return Model;
}());
// handles the DOM, HTML, and CSS
var View = /** @class */ (function () {
    function View() {
        this.app = this.getElement("#root");
        this.title = this.createElement("h1");
        this.title.textContent = "My Planner";
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placehold = "Add Task";
        this.input.name = "task";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.taskList = this.createElement("ul", "todo-list");
        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.taskList);
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
    View.prototype.getTaskText = function () {
        return this.input.value;
    };
    View.prototype.resetInput = function () {
        this.input.value = "";
    };
    View.prototype.displayTasks = function (tasks) {
        var _this = this;
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }
        if (tasks.length === 0) {
            var p = this.createElement("p");
            p.textContent = "No tasks yet! Start dumping your thoughts!";
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
                li.append(checkbox, span, deleteButton);
                _this.taskList.append(li);
            });
        }
    };
    return View;
}());
var Controller = /** @class */ (function () {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
    }
    return Controller;
}());
var app = new Controller(new Model(), new View());
