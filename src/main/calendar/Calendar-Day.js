import React from "react";
import "./Calendar-Day.css";
import * as dateFns from "date-fns";
import DayView from "./Day-View";
import LeftArrow from "/Users/chiazo/my-planner/my-planner/src/icons/left_arrow.png";
import RightArrow from "/Users/chiazo/my-planner/my-planner/src/icons/right_arrow.png"


class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.state.divMap.set(this.state.currDate, []);
    }
    state = {
        currMonth: new Date(),
        currDate: new Date(),
        currHour: new Date(),
        selectedHour: new Date(),
        freeHours: [],
        restrictedHours: [],
        currDivs: [],
        allDivs: [],
        divMap: new Map()
    };

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
                        {dateFns.format(this.state.currDate, dateFormat)}
                    </span>
                </div>
                <div className="right-arr icon header"
                    onClick={this.nextDay}>
                    <img className="arrows " src={RightArrow} alt="right_arrow" />
                </div>
            </div>
        );
    }


    // componentDidUpdate(prevProps, prevState) {
    //     const { divMap, currDate } = this.state;

    //     if (prevProps.currDate) {
    //         if (prevProps.currDate.toString() !== currDate.toString()) {
    //             var divsToColor;
    //             if (divMap.has(currDate.toString())) {
    //                 divsToColor = divMap.get(currDate.toString());
    //                 divsToColor.forEach(el => {
    //                     el.style.backgroundColor = "#32a854";
    //                 })
    //             } else {
    //                 const divElements = document.querySelectorAll(".color");
    //                 divElements.forEach(el => {
    //                     el.style.backgroundColor = "";
    //                 })
    //             }
    //         }
    //     }

    // }

    onHourClick = (hour, div) => {
        var updatedHours = this.state.freeHours.concat(hour);
        var updatedDivs;
        if (this.state.divMap.has(this.state.currDate)) {
            updatedDivs = this.state.divMap.get(this.state.currDate).concat(div);
        } else {
            updatedDivs = [div];
        }
        var allKnownDivs = this.state.allDivs.concat(div);

        if (this.containsHour(hour)) {
            updatedHours = this.state.freeHours.filter(item => item.getTime() !== hour.getTime());
            if (this.state.divMap.has(this.state.currDate)) {
                updatedDivs = this.state.divMap.get(this.state.currDate).filter(item => item !== div);
            }
        }

        var newMap = this.state.divMap.set(this.state.currDate, updatedDivs);

        this.setState({
            freeHours: updatedHours,
            divMap: newMap,
            allDivs: allKnownDivs
        })

        if (!div.style.backgroundColor) {
            div.style.backgroundColor = "#7db3f0";
        } else {
            div.style.backgroundColor = "";
        }
    }

    containsHour = hour => {
        return this.state.freeHours.some(item => item.getTime() === hour.getTime());
    }

    changeDivColors = () => {
        // if (this.state.divMap.has(this.state.currDate)) {
        //     this.state.divMap.get(this.state.currDate).forEach(div => {
        //         div.style.backgroundColor = "#7db3f0";
        //     })
        // } else {
        //     this.state.allDivs.forEach(div => {
        //         div.style.backgroundColor = "";
        //     });
        // }

        this.state.allDivs.forEach(d => {
            d.style.backgroundColor = "";
        })
    }


    nextDay = () => {
        this.setState({
            currDate: dateFns.addDays(this.state.currDate, 1)
        });

        this.changeDivColors();
    };

    prevDay = () => {
        this.setState({
            currDate: dateFns.subDays(this.state.currDate, 1)
        });

        this.changeDivColors();
    };


    render() {
        return (
            <div className="calendar-day">
                {this.renderHeader()}
                <DayView currDate={dateFns.startOfDay(new Date())}
                    selectedHour={this.state.selectedHour}
                    onHourClick={this.onHourClick.bind(this)} />
                {/* <div>Cells</div> */}
            </div>
        )
    }
}

export default CalendarDay;