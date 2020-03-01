import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";

class CalendarDay extends React.Component {
    state = {
        currMonth: new Date(),
        currDate: new Date()
    };

    renderHeader() {
        const dateFormat = "EEEE | MMM d, yyyy";

        return (
            <div className="header-day row">
                <div className="left-arr icon header"
                onClick={this.prevDay} >
                    left_arrow
                </div>
                <div className="date header">
                    <span>
                        {dateFns.format(this.state.currDate, dateFormat)}
                    </span>
                </div>
                <div className="right-arr icon header"
                onClick={this.nextDay}>
                    right_arrow
                </div>
            </div>
        );
    }

    renderHours() {

    }

    onCellClick = hour => {

    };

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
        return(
            <div className="calendar-day">
                {this.renderHeader()}
                {this.renderHours()}
                {/* <div>Cells</div> */}
            </div>
        )
    }
}

export default CalendarDay;