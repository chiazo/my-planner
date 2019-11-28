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
        this.hours = [];
        for (var i = 0; i < 12; i++) {
            this.hours[this.hours.length] = new Hour(i + 8);
        }
        this.reset();
    }
    Day.prototype.addTask = function (name, hours, mins) {
        this.tasks[this.tasks.length] = new Task(this.tasks.length, name, hours, mins);
    };
    Day.prototype.addEvent = function (name, hours, mins) {
        this.events[this.events.length] = new Event(this.events.length, name, hours, mins);
    };
    Day.prototype.removeTask = function (task) {
        delete this.tasks[task.id];
    };
    Day.prototype.removeEvent = function (e) {
        delete this.events[e.id];
    };
    Day.prototype.reset = function () {
        this.hours = [];
        for (var i = 0; i < 12; i++) {
            this.hours[this.hours.length] = new Hour(i + 8);
        }
    };
    Day.prototype.schedule = function () {
        var i = 0;
        var h = 0;
        var hour = this.hours[h];
        var task = this.tasks[i];
        while (i < this.tasks.length && task !== null && h !== 12) {
            if ((hour.takenTime + task.timeInMinutes()) < 60) {
                hour.addTask(task);
                task.changeTimeSpan(hour.getStartTime());
            }
            h++;
            i++;
        }
    };
    return Day;
}());
exports.Day = Day;
var Hour = /** @class */ (function () {
    function Hour(startime) {
        this.startTime = startime;
        this.endTime = startime + 1;
        this.tasks = [];
        this.events = [];
        this.takenTime = 0;
        if (this.startTime <= 12) {
            this.morning = true;
        }
        else {
            this.morning = false;
        }
    }
    Hour.prototype.addTask = function (t) {
        this.tasks[this.tasks.length] = t;
        this.takenTime += t.time.getMinutes();
    };
    Hour.prototype.addEvent = function (e) {
        this.events[this.events.length] = e;
        this.takenTime += e.time.getMinutes();
    };
    Hour.prototype.removeTask = function (task) {
        this.takenTime -= task.time.getMinutes();
        delete this.tasks[task.id];
    };
    Hour.prototype.removeEvent = function (e) {
        this.takenTime -= e.time.getMinutes();
        delete this.events[e.id];
    };
    Hour.prototype.getStartTime = function () {
        if (this.startTime <= 12) {
            return this.startTime;
        }
        else {
            return this.startTime - 12;
        }
    };
    return Hour;
}());
exports.Hour = Hour;
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
        this.startTime = -2;
        this.endTime = -1;
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
    Task.prototype.changeTimeSpan = function (start) {
        this.startTime = start;
        this.endTime = start + this.timeInHours();
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
