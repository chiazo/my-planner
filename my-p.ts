import { Day } from "./myp-model";
import { DayView } from "./myp-view";
import { DayController } from "./myp-controller";

export let main = async () => {
    let model = new Day();
    let view = new DayView(model);
    let controller = new DayController(model, view);
    view.update();
}

main();