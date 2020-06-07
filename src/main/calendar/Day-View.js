import React from "react";
import * as dateFns from "date-fns";

class DayView extends React.Component {

    state = {
        divs_to_text: new Map(),
        hours: [],
        keys: [],
        dayStart: this.props.currDate,
        task_text: ""
    }

    createView() {
        const { hours, keys, divs_to_text } = this.state;
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
                    divs_to_text.set(Number(currHour.valueOf()), "\u00A0\u00A0\u00A0\u00A0\u00A0")
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
                            {this.state.task_text}
                        </div>;

                        cells.push(curr_div)
                    } else {

                        curr_div = <div className="row hour-cell cell color"
                            onClick={(e) => onHourClick(keys[j + 12], e.currentTarget)} key={keys[j + 12]}>
                            {this.state.task_text}
                        </div>;
                        cells.push(curr_div)
                    }

                }

                tempDay = dateFns.addHours(tempDay, 1);
                hours.push(<div className="column" key={i + 4}>{cells}</div>)
                cells = [];
            }

        }

        this.scheduleCheck();
    }

    updateDiv(text, idx) {
        const { keys} = this.state;
        const { onHourClick } = this.props;
        
        return (
            <div className="row hour-cell cell color"
                onClick={(e) => onHourClick(keys[idx], e.currentTarget)} key={keys[idx]}>
                {text}
            </div>
        )
    }

    makeTaskList(arr) {
        if (arr.length !== 0) {
            return (
                <ul>
                    {arr.map(function(task, idx){
                        return <li key={idx}>{task.name} - {task.est} mins</li>
                    })}
                </ul>
            )
        }
    }

    scheduleCheck() {
        const { divs_to_text } = this.state;
        const { schedule } = this.props;
        
        if (schedule) {

            for (let event of schedule) {
                let tasks = event.tasks;
                divs_to_text.set(Number(event.hour), this.makeTaskList(tasks))
            }

        }
       
    }

    renderDivs() {
        const { hours, divs_to_text } = this.state;
    
        let all_divs = []

        for (const [index, div] of hours.entries()) {
            if (index % 2 !== 0) {
                let col = div.props.children;
                all_divs = all_divs.concat(col)
            } 
        }

        for (let i = 0; i < 24; i++) {
            let curr_div = all_divs[i]
            let text = divs_to_text.get(+curr_div.key)
            if (typeof(text) === "object") {
                let hours_idx = 1, col_idx = i;
                if (i > 11) {
                    hours_idx = 3;
                    col_idx -= 12;
                }
                let col = hours[hours_idx].props.children
                col[col_idx] = this.updateDiv(text, i)
            }
        }

        console.log(hours)

        return hours;
    }
        

    UNSAFE_componentWillMount() {
        this.createView();
    }

    render() {

        return (
            <div>
                <div className="day-view">
                    {this.renderDivs()} 
                </div>
            </div>
        )
    }
}

export default DayView;