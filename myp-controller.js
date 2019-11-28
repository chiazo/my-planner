"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The controller handles user actions that will impact the model
 * and the view!
 */
var DayController = /** @class */ (function () {
    function DayController(model, view) {
        this.model = model;
        this.view = view;
        this.task = document.getElementById("task-name");
        this.hours = document.getElementById("hours");
        this.mins = document.getElementById("mins");
        this.submitButton = document.getElementById("submit");
        this.finishedButton = document.getElementById("finished");
        this.start();
    }
    DayController.prototype.start = function () {
        this.view.update();
        this.submitButton.onclick = this.handleSubmit.bind(this);
        this.finishedButton.onclick = this.makeSchedule.bind(this);
    };
    DayController.prototype.handleSubmit = function () {
        this.model.addTask(this.task.name, parseFloat(this.hours.value), parseFloat(this.mins.value));
        console.log(this.task.name + parseFloat(this.hours.value) + parseFloat(this.mins.value));
        this.view.update();
    };
    DayController.prototype.makeSchedule = function () {
        this.model.schedule();
        this.view.update();
    };
    DayController.prototype.clear = function () {
        this.model.reset();
        this.view.update();
    };
    return DayController;
}());
exports.DayController = DayController;
