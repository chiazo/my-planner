class Task {
    id: number;
    text: string;
    complete: boolean;
    time: number;

    constructor(id: number, text: string, complete: boolean, time: number) {
        this.id = id;
        this.text = text;
        this.complete = complete;
        this.time = time;
    }

}

class Model {
    tasks: Task[];
    constructor() {

        this.tasks = [
            { id: 1, text: "Message back Morehead", complete: false, time: 15},
            { id: 2, text: "Finish adding transcripts to site", complete: false, time: 80},
        ]

    }

    addTask(input: string) {
        let currTask = {
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            text: input,
            complete: false,
            time: 20,
        }

        this.tasks.push(currTask);
    }

    editTaskText(id: number, updatedInput: string) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: updatedInput, complete: task.complete, time: task.time} : task,
        )
    }

    editTaskTime(id: number, updatedTime: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: task.text, complete: task.complete, time: updatedTime} : task,
        )
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task =>
           task.id !== id 
        )
    }

    toggleTask(id: number) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {id: task.id, text: task.text, complete: !task.complete, time: task.time} : task,
        )
    }
}

class View {
    constructor() {}
}

class Controller {
     model: Model;
     view: View;
    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }
}

let app = new Controller(new Model(), new View());