"use strict";
var Task = /** @class */ (function () {
    function Task(id, text, complete, time) {
        this.id = id;
        this.text = text;
        this.complete = complete;
        this.time = time;
    }
    return Task;
}());
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
var View = /** @class */ (function () {
    function View() {
    }
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
