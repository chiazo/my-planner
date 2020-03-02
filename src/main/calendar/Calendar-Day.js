import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";
import DayView from "./Day-View";


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

    onHourClick = day => {
        var updatedHours = this.state.freeHours.concat(day);

        this.setState({
            freeHours: updatedHours
        })

        console.log(updatedHours);
    }

    // renderHours() {
    //     const dateFormat = "h a";
    //     const { currDate, selectedHour } = this.state;
    //     let dayStart = dateFns.startOfDay(currDate);
    //     const dayEnd = dateFns.endOfDay(currDate);
    //     dayStart = dateFns.addHours(dayStart, 1);

    //     const rows = [];
    //     let hours = [];
    //     let begHour = dayStart.getHours();
    //     let endHour = dayEnd.getHours();
    //     let currHour = dayStart;
    //     let formattedHour = "";

    //         for (let i = 0; i < 4; i++) {
    //             let cells = [];
    //             let tempDay = dayStart;
    
    //             if (i % 2 === 0) {
    //                 for (let j = 0; j < 12; j++) {
    //                     formattedHour = dateFns.format(currHour, dateFormat);
    //                     cells.push(<div className="row hour-cell cell" key={tempDay}>
    //                         {formattedHour}
    //                     </div>)
    //                     currHour = dateFns.addHours(currHour, 1);
    //                 }
    //                 tempDay = dateFns.addHours(tempDay, 1);
    //                 hours.push(<div className="column hour-cell cell" key={tempDay}>{cells}</div>)
    //             } else {
    //                 for (let j = 0; j < 12; j++) {
    
    //                     cells.push(<div className="row"
    //                         onClick={(currHour) => this.onHourClick(currHour)}>
    //                         hello
    //                     </div>)
    
    //                 }
    //                 tempDay = dateFns.addHours(tempDay, 1);
    //                 hours.push(<div className="column">{cells}</div>)
    //             }
    
    //         }
        

    //     return <div className="day-view">{hours}</div>
    // }


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
            <div className="calendar-day row">
                {this.renderHeader()}
                <DayView currDate={dateFns.startOfDay(new Date())} selectedHour={this.state.selectedHour}/>
                {/* <div>Cells</div> */}
            </div>
        )
    }
}

export default CalendarDay;