/**
 * The model contains data about each task and 
 * has logic for handling task data!
 *  */

export class Day {
    tasks: Task[];
    events: Event[];
    date: Date;

    constructor() {
        this.tasks = [];
        this.events = [];
        this.date = new Date();
    }

    addTask(name: string) {
        this.tasks[this.tasks.length] = new Task(this.tasks.length, name);
    }

    addEvent() {
        this.events[this.events.length] = new Event(this.events.length, name);
    }

    removeTask(task: Task) {
        delete this.tasks[task.id];
    }

    removeEvent(e: Event) {
        delete this.events[e.id];
    }
}

export class Task {
    id: number;
    name: string;
    complete: boolean;
    time: Date;
    subtasks: Task[];

    constructor(id: number, name: string, hours?: number, mins?: number) {
        this.id = id;
        this.name = name;
        this.time = new Date();
        this.complete = false;
        this.subtasks = [];
        if (mins !== undefined && hours !== undefined) {
            this.time.setMinutes(mins + (hours * 60));
        } else if (mins !== undefined) {
            this.time.setMinutes(mins);
        } else if (hours !== undefined) {
            this.time.setMinutes(hours * 60);
        } else {
            this.time.setMinutes(20);
        }
    }

    addSubTask(name: string, hours?: number, mins?: number): void {
        this.subtasks[this.subtasks.length] = new Task(this.subtasks.length, name, hours, mins);
    }

    hasSubTasks(): boolean {
        return this.subtasks.length !== 0;
    }

    timeInHours(): number {
        return this.time.getHours(); 
    }

    timeInMinutes(): number {
        return this.time.getMinutes();
    }
    
    removeSubTask(id: number) {
        delete this.subtasks[id];
    }

    editTaskName(name: string) {
        this.name = name;
    }

    editTaskTime(hours?: number, mins?: number) {
        if (hours !== undefined) this.time.setHours(hours);
        if (mins !== undefined) this.time.setMinutes(mins);
    }

    completeTask() {
        this.complete = true;
    }

    isComplete(): boolean {
        return this.complete;
    }
 }

 export class Event {
    id: number;
    name: string;
    time: Date;
    days: string[];

    constructor(id: number, name: string, hours?: number, mins?: number) {
        this.id = id;
        this.name = name;
        this.time = new Date();
        this.days = [];
        if (mins !== undefined && hours !== undefined) {
            this.time.setMinutes(mins + (hours * 60));
        } else if (mins !== undefined) {
            this.time.setMinutes(mins);
        } else if (hours !== undefined) {
            this.time.setMinutes(hours * 60);
        } else {
            this.time.setMinutes(20);
        }
    }

    timeInHours(): number {
        return this.time.getHours(); 
    }

    timeInMinutes(): number {
        return this.time.getMinutes();
    }

    editEventName(name: string) {
        this.name = name;
    }

    editEventTime(hours?: number, mins?: number) {
        if (hours !== undefined) this.time.setHours(hours);
        if (mins !== undefined) this.time.setMinutes(mins);
    }

    removeDay(day: string) {
        let idx = this.days.indexOf(day);
        if (idx !== -1) delete this.days[idx];
    }

    addDay(day: string) {
        if (this.days.indexOf(day) === -1 ) {
            this.days[this.days.length] = day;
        }
    }

 }