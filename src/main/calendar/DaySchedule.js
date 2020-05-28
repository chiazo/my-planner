import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";
import DayView from "./Day-View";

const DaySchedule = ({ schedule }) => {

    return (
        <div>
            <h4>Your Schedule!</h4>
            <DayView currDate={dateFns.startOfDay(new Date())}
            schedule={schedule} onHourClick={function(){}}/>
        </div>
    )
}
export default DaySchedule;