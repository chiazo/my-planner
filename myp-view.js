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
        var _this = this;
        while (this.calendar.firstChild !== null) {
            this.calendar.removeChild(this.calendar.firstChild);
        }
        var grid = this.model.hours;
        var table = document.createElement("table");
        var _loop_1 = function (row) {
            var tr = document.createElement("tr");
            var _loop_2 = function (col) {
                var td = document.createElement("td");
                // td.setAttribute("class", "blah")
                if (grid[row].tasks.length !== 0) {
                    td.setAttribute("class", "containsT");
                }
                else {
                    td.setAttribute("class", "noT");
                }
                td.onclick = function () {
                    if (_this.onselect !== null) {
                        console.log(row, col);
                    }
                };
                tr.appendChild(td);
            };
            for (var col = 0; col < 1; col++) {
                _loop_2(col);
            }
            table.appendChild(tr);
        };
        for (var row = 0; row < grid.length; row++) {
            _loop_1(row);
        }
        this.calendar.appendChild(table);
    };
    return DayView;
}());
exports.DayView = DayView;
