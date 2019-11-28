import { Day, Hour } from "./myp-model";

export interface SelectEventHandler {
    (row: number, col: number): void;
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

         let grid: Hour[] = this.model.hours;
         let table: HTMLTableElement = document.createElement("table");

         for (let row = 0; row < grid.length; row++) {
             let tr: HTMLTableRowElement = document.createElement("tr");
             for (let col = 0; col < 1; col++) {
                 let td: HTMLTableDataCellElement = document.createElement("td");
                 // td.setAttribute("class", "blah")
                 if (grid[row].tasks.length !== 0) {
                     td.setAttribute("class", "containsT");
                 } else {
                     td.setAttribute("class", "noT");
                 }
                 td.onclick = () => {
                     if (this.onselect !== null) {
                         console.log(row, col);
                     }
                 };

                 tr.appendChild(td);

             }
             table.appendChild(tr);
         }

         this.calendar.appendChild(table);
     }
 }