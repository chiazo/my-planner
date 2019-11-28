import { Day } from "./myp-model";

export interface SelectEventHandler {

}

/**
 * The view will create the visual representation
 * of the model onto the page. When the view updates,
 * it will generate a new view.
 */

 export class DayView {
     model: Day;
     calendar: HTMLElement;
     onselect: SelectEventHandler | null = null;

     constructor(model: Day) {
         this.model = model;
         this.calendar = document.getElementById("calendar") as HTMLElement;
     }

     update(): void {
         while (this.calendar.firstChild !== null) {
             this.calendar.removeChild(this.calendar.firstChild);
         }
     }
 }