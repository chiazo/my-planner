import React from "react";
import * as dateFns from "date-fns";

const DayView = ({ currDate, onHourClick }) => {

    const dateFormat = "h a";
        const currentDate = currDate;
        let dayStart = dateFns.startOfDay(currentDate);
        const dayEnd = dateFns.endOfDay(currentDate);
        dayStart = dateFns.addHours(dayStart, 1);

        const rows = [];
        let hours = [];
        let keys = [];
        let begHour = dayStart.getHours();
        let endHour = dayEnd.getHours();
        let currHour = dayStart;
        let formattedHour = "";

    for (let i = 0; i < 4; i++) {
        let cells = [];
        let tempDay = dayStart;

        if (i % 2 === 0) {
            for (let j = 0; j < 12; j++) {
                formattedHour = dateFns.format(currHour, dateFormat);
                cells.push(<div className="row hour-cell cell" key={i}>
                    {formattedHour}
                </div>)
                keys.push(currHour);
                currHour = dateFns.addHours(currHour, 1);
            }
            tempDay = dateFns.addHours(tempDay, 1);
            hours.push(<div className="column hour-col cell" key={i + 12}>{cells}</div>)
        } else {
            for (let j = 0; j < 12; j++) {
                cells.push(<div className="row"
                    onClick={() => onHourClick(keys[j])} key={keys[j]}>
                    &nbsp;
                </div>)

            }
            tempDay = dateFns.addHours(tempDay, 1);
            hours.push(<div className="column">{cells}</div>)
        }

    }
    
    return(
        <div className="day-view">{hours}</div>
    )
}

export default DayView;