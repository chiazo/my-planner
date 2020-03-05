import React from "react";
import * as dateFns from "date-fns";

const DayView = ({ currDate, onHourClick }) => {

    const dateFormat = "h a";
        const currentDate = currDate;
        let dayStart = dateFns.startOfDay(currentDate);
        dayStart = dateFns.addHours(dayStart, 1);

        let hours = [];
        let keys = [];
        let currHour = dayStart;
        let formattedHour = "";

    for (let i = 0; i < 4; i++) {
        let cells = [];
        let tempDay = dayStart;

        if (i % 2 === 0) {
            for (let j = 0; j < 12; j++) {
                formattedHour = dateFns.format(currHour, dateFormat);
                cells.push(<div className="row hour-cell cell" key={j + 1}>
                    {formattedHour}
                </div>)
                keys.push(currHour);
                currHour = dateFns.addHours(currHour, 1);
            }
            tempDay = dateFns.addHours(tempDay, 1);
            hours.push(<div className="column hour-col cell" key={i}>{cells}</div>)
            cells = [];
        } else {
            for (let j = 0; j < 12; j++) {
                cells.push(<div className="row hour-cell cell"
                    onClick={(e) => onHourClick(keys[j], e.currentTarget)} key={keys[j]}>
                        &emsp;&emsp;&emsp;&emsp;&emsp;
                </div>)

            }
            tempDay = dateFns.addHours(tempDay, 1);
            hours.push(<div className="column" key={i + 4}>{cells}</div>)
            cells = [];
        }

    }
    
    return(
        <div className="day-view">{hours}</div>
    )
}

export default DayView;