import React from "react";
import * as dateFns from "date-fns";

const DayView = (props) => {

    const dateFormat = "h a";
        const currDate = props.currDate;
        let dayStart = dateFns.startOfDay(currDate);
        const dayEnd = dateFns.endOfDay(currDate);
        dayStart = dateFns.addHours(dayStart, 1);

        const rows = [];
        let hours = [];
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
                cells.push(<div className="row hour-cell cell" key={tempDay}>
                    {formattedHour}
                </div>)
                currHour = dateFns.addHours(currHour, 1);
            }
            tempDay = dateFns.addHours(tempDay, 1);
            hours.push(<div className="column hour-cell cell" key={tempDay}>{cells}</div>)
        } else {
            for (let j = 0; j < 12; j++) {

                cells.push(<div className="row"
                    onClick={(currHour) => this.onHourClick(currHour)}>
                    hello
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