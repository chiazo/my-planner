import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";
import DayView from "./Day-View";
import LeftArrow from "/Users/chiazo/my-planner/my-planner/src/icons/left_arrow.png";
import RightArrow from "/Users/chiazo/my-planner/my-planner/src/icons/right_arrow.png"


class CalendarDay extends React.Component {
    state = {
        currMonth: new Date(),
        currDate: new Date(),
        currHour: new Date(),
        selectedHour: new Date(),
        freeHours: [],
        restrictedHours: []
    };

    renderHeader() {
        const dateFormat = "EEEE | MMM d, yyyy";

        return (
            <div className="header-day row">
                <div className="left-arr icon header"
                    onClick={this.prevDay} >
                    <img className="arrows "src={LeftArrow} alt="left_arrow"/>
                </div>
                <div className="date header">
                    <span>
                        {dateFns.format(this.state.currDate, dateFormat)}
                    </span>
                </div>
                <div className="right-arr icon header"
                    onClick={this.nextDay}>
                    <img className="arrows "src={RightArrow} alt="right_arrow"/>
                </div>
            </div>
        );
    }

    onHourClick = day => {
        var updatedHours = this.state.freeHours.concat(day);

        this.setState({
            freeHours: updatedHours
        })

        console.log(updatedHours);
    }

    nextDay = () => {
        this.setState({
            currDate: dateFns.addDays(this.state.currDate, 1)
        });
    };

    prevDay = () => {
        this.setState({
            currDate: dateFns.subDays(this.state.currDate, 1)
        });

    };


    render() {
        return (
            <div className="calendar-day">
                {this.renderHeader()}
                <DayView currDate={dateFns.startOfDay(new Date())} 
                selectedHour={this.state.selectedHour}
                onHourClick={this.onHourClick.bind(this)}/>
                {/* <div>Cells</div> */}
            </div>
        )
    }
}

export default CalendarDay;