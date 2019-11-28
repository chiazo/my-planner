"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The view will create the visual representation
 * of the model onto the page. When the view updates,
 * it will generate a new view.
 */
var DayView = /** @class */ (function () {
    function DayView(model) {
        this.onselect = null;
        this.model = model;
        this.calendar = document.getElementById("calendar");
    }
    DayView.prototype.update = function () {
        while (this.calendar.firstChild !== null) {
            this.calendar.removeChild(this.calendar.firstChild);
        }
    };
    return DayView;
}());
exports.DayView = DayView;
