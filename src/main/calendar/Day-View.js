import React from "react";
import * as dateFns from "date-fns";

class DayView extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.props.divMap.set(this.props.currDate, []);
    // }

    state = {
        divs_to_text: new Map(),
        hours: [],
        keys: [],
        dayStart: this.props.currDate,
        hour_to_divs: new Map()
    }

    createView() {
        const { hours, keys } = this.state;
        const { onHourClick, currDate } = this.props;

        const dateFormat = "h a";
        const currentDate = currDate;
        let dayStart = dateFns.startOfDay(currentDate);
        dayStart = dateFns.addHours(dayStart, 1);

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
                    keys.push(currHour.valueOf());
                    currHour = dateFns.addHours(currHour, 1);
                }
                tempDay = dateFns.addHours(tempDay, 1);
                hours.push(<div className="column hour-col cell" key={i}>{cells}</div>)
                cells = [];
            } else {
                let curr_div;
                for (let j = 0; j < 12; j++) {
                    if (i === 1) {
                        curr_div = <div className="row hour-cell cell color"
                            onClick={(e) => onHourClick(keys[j], e.currentTarget)} key={keys[j]}>
                            &emsp;&emsp;&emsp;&emsp;&emsp;
                </div>;

                        cells.push(curr_div)
                    } else {
                        curr_div = <div className="row hour-cell cell color"
                            onClick={(e) => onHourClick(keys[j + 12], e.currentTarget)} key={keys[j + 12]}>
                            &emsp;&emsp;&emsp;&emsp;&emsp;
            </div>;
                        cells.push(curr_div)
                    }

                }
                tempDay = dateFns.addHours(tempDay, 1);
                hours.push(<div className="column" key={i + 4}>{cells}</div>)
                cells = [];
            }

        }
    }

    scheduleCheck() {
        const { hours, hour_to_divs } = this.state;
        const { schedule } = this.props;
        if (schedule) {
            let all_divs = []
            for (let hr of hours) {
                if (hr.key % 2 !== 0) {
                    let hour_divs = hr.props.children
                    hour_divs.forEach(x => all_divs.push(x))
                }
            }

            for (let div of all_divs) {
                hour_to_divs.set(+div.key, div)
            }

            for (let event of schedule) {
                let div = hour_to_divs.get(+event.hour)
                // let tasks = event.tasks;
                // div.props.children = "HI"
                console.log(div)
            }


        }
    }

    componentWillMount() {
        this.createView();
    }

    render() {
        const { hours } = this.state;
        this.scheduleCheck()
        return (
            <div>
                <div className="day-view">{hours}</div>
            </div>
        )
    }
}

export default DayView;