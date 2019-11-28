import { Day } from "./myp-model";
import { DayView } from "./myp-view";

export class DayController {
    model: Day;
    view: DayView;

    constructor(model: Day, view: DayView) {
        this.model = model;
        this.view = view;
    }
}