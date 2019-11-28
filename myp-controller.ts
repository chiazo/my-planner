import { Day } from "./myp-model";
import { DayView } from "./myp-view";

/**
 * The controller handles user actions that will impact the model
 * and the view!
 */

export class DayController {
    model: Day;
    view: DayView;

    task: HTMLInputElement;
    hours: HTMLInputElement;
    mins: HTMLInputElement;
    submitButton: HTMLButtonElement;
    finishedButton: HTMLButtonElement;


    constructor(model: Day, view: DayView) {
        this.model = model;
        this.view = view;

        this.task = document.getElementById("task-name") as HTMLInputElement;
        this.hours = document.getElementById("hours") as HTMLInputElement;
        this.mins = document.getElementById("mins") as HTMLInputElement;
        this.submitButton = document.getElementById("submit") as HTMLButtonElement;
        this.finishedButton = document.getElementById("finished") as HTMLButtonElement;

        this.start();
    }

    start(): void {
        this.view.update();
        this.submitButton.onclick = this.handleSubmit.bind(this);
        this.finishedButton.onclick = this.makeSchedule.bind(this);
    }

    handleSubmit(): void {
        this.model.addTask(this.task.name, parseFloat(this.hours.value), parseFloat(this.mins.value));
        console.log(this.task.name + parseFloat(this.hours.value) + parseFloat(this.mins.value));
        this.view.update();
    }


    makeSchedule(): void {
        this.model.schedule();
        this.view.update();
    }

    clear(): void {
        this.model.reset();
        this.view.update();
    }
    
}