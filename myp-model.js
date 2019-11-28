"use strict";
/**
 * The model contains data about each task and
 * has logic for handling task data!
 *  */
Object.defineProperty(exports, "__esModule", { value: true });
var Day = /** @class */ (function () {
    function Day() {
        this.tasks = [];
        this.events = [];
        this.date = new Date();
    }
    Day.prototype.addTask = function (name) {
        this.tasks[this.tasks.length] = new Task(this.tasks.length, name);
    };
    Day.prototype.addEvent = function () {
        this.events[this.events.length] = new Event(this.events.length, name);
    };
    Day.prototype.removeTask = function (task) {
        delete this.tasks[task.id];
    };
    Day.prototype.removeEvent = function (e) {
        delete this.events[e.id];
    };
    return Day;
}());
exports.Day = Day;
var Task = /** @class */ (function () {
    function Task(id, name, hours, mins) {
        this.id = id;
        this.name = name;
        this.time = new Date();
        this.complete = false;
        this.subtasks = [];
        if (mins !== undefined && hours !== undefined) {
            this.time.setMinutes(mins + (hours * 60));
        }
        else if (mins !== undefined) {
            this.time.setMinutes(mins);
        }
        else if (hours !== undefined) {
            this.time.setMinutes(hours * 60);
        }
        else {
            this.time.setMinutes(20);
        }
    }
    Task.prototype.addSubTask = function (name, hours, mins) {
        this.subtasks[this.subtasks.length] = new Task(this.subtasks.length, name, hours, mins);
    };
    Task.prototype.hasSubTasks = function () {
        return this.subtasks.length !== 0;
    };
    Task.prototype.timeInHours = function () {
        return this.time.getHours();
    };
    Task.prototype.timeInMinutes = function () {
        return this.time.getMinutes();
    };
    Task.prototype.removeSubTask = function (id) {
        delete this.subtasks[id];
    };
    Task.prototype.editTaskName = function (name) {
        this.name = name;
    };
    Task.prototype.editTaskTime = function (hours, mins) {
        if (hours !== undefined)
            this.time.setHours(hours);
        if (mins !== undefined)
            this.time.setMinutes(mins);
    };
    Task.prototype.completeTask = function () {
        this.complete = true;
    };
    Task.prototype.isComplete = function () {
        return this.complete;
    };
    return Task;
}());
exports.Task = Task;
var Event = /** @class */ (function () {
    function Event(id, name, hours, mins) {
        this.id = id;
        this.name = name;
        this.time = new Date();
        this.days = [];
        if (mins !== undefined && hours !== undefined) {
            this.time.setMinutes(mins + (hours * 60));
        }
        else if (mins !== undefined) {
            this.time.setMinutes(mins);
        }
        else if (hours !== undefined) {
            this.time.setMinutes(hours * 60);
        }
        else {
            this.time.setMinutes(20);
        }
    }
    Event.prototype.timeInHours = function () {
        return this.time.getHours();
    };
    Event.prototype.timeInMinutes = function () {
        return this.time.getMinutes();
    };
    Event.prototype.editEventName = function (name) {
        this.name = name;
    };
    Event.prototype.editEventTime = function (hours, mins) {
        if (hours !== undefined)
            this.time.setHours(hours);
        if (mins !== undefined)
            this.time.setMinutes(mins);
    };
    Event.prototype.removeDay = function (day) {
        var idx = this.days.indexOf(day);
        if (idx !== -1)
            delete this.days[idx];
    };
    Event.prototype.addDay = function (day) {
        if (this.days.indexOf(day) === -1) {
            this.days[this.days.length] = day;
        }
    };
    return Event;
}());
exports.Event = Event;
