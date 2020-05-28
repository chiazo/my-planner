import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";
import DayView from "./Day-View";
import LeftArrow from "/Users/chiazo/my-planner/my-planner/src/icons/left_arrow.png";
import RightArrow from "/Users/chiazo/my-planner/my-planner/src/icons/right_arrow.png"


class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.props.divMap.set(this.props.currDate, []);
    }

    state = {
        selectedHour: new Date(),
        restrictedHours: [],
        currHour: new Date(),
        currDivs: [],
        currMonth: new Date(),
    }

    replaceText(e) {
        const curr_val = e.target.textContent;
        console.log(curr_val)
    }

    renderHeader() {
        const dateFormat = "EEEE | MMM d, yyyy |  h:mm a";
        // const currTimeFormate = ""

        return (
            <div className="header-day row">
                <div className="left-arr icon header"
                    onClick={this.prevDay} >
                    <img className="arrows " src={LeftArrow} alt="left_arrow" />
                </div>
                <div className="date header">
                    <span>
                        {dateFns.format(this.props.currDate, dateFormat)}
                    </span>
                </div>
                <div className="right-arr icon header"
                    onClick={this.nextDay}>
                    <img className="arrows " src={RightArrow} alt="right_arrow" />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="calendar-day">
                {this.renderHeader()}
                <DayView currDate={dateFns.startOfDay(new Date())}
                    selectedHour={this.state.selectedHour}
                    onHourClick={this.props.onHourClick.bind(this)} 
                    replaceText={this.replaceText.bind(this)}/>
                {/* <div>Cells</div> */}
                
            </div>
        )
    }
}

export default CalendarDay;