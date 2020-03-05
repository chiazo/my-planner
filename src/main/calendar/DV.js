import React from "react";
import * as dateFns from "date-fns";
import { te } from "date-fns/locale";

class DayView extends React.Component {

    state = {
        table: []
    }

    
   setUpArray() {
    const dateFormat = "h a";
    const currentDate = this.props.currDate;
    let dayStart = dateFns.startOfDay(currentDate);
    const dayEnd = dateFns.endOfDay(currentDate);
    dayStart = dateFns.addHours(dayStart, 1);

    const rows = [];
    let hours = [];
    let keys = [];
    let begHour = dayStart.getHours();
    let endHour = dayEnd.getHours();
    let currHour = dayStart;
    let hour2 = dateFns.addHours(currHour, 12);
    let formattedHour = "";
    let formattedHour2 = "";

    let tempDay = dayStart;

    for (let i = 0; i < 12; i++) {
        var row = { "id": "", "time1": "", "empty1": "", "time2": "", "empty2": ""};
        formattedHour = dateFns.format(currHour, dateFormat);
        formattedHour2 = dateFns.format(hour2, dateFormat)

        keys.push(currHour);
        keys.push(hour2);

        row.id = i;
        row.time1 = <tr className="row hour-cell" key={i}>
            {formattedHour}
        </tr>;
        row.empty = <th className="row empty hour-cell"
            onClick={() => this.props.onHourClick(keys[i])} key={keys[i]}>
            &emsp;&emsp;&emsp;&emsp;&emsp;
    </th>;
        row.time2 = <th className="row hour-cell" key={i}>
        {formattedHour2}
    </th>;
        row.empty2 = <th className="row empty hour-cell"
        onClick={() => this.props.onHourClick(keys[i+1])} key={keys[i+1]}>
        &emsp;&emsp;&emsp;&emsp;&emsp;
</th>;
        console.log(row);
        
        currHour = dateFns.addHours(currHour, 1);
        tempDay = dateFns.addHours(tempDay, 1);
       
        var tempTable = this.state.table;
        tempTable.push(row);
        // this.setState(prevState => ({
        //     table: [...prevState.table, row]
        // }))

        this.state.table = tempTable;

    }

    console.log(this.state.table)

   }

    /**
     * const newlyAddedOption = {id:"3", name:"UK"}
this.setState(prevState => ({
    selectedCountries: [...prevState.selectedCountries, newlyAddedOption]
}));
     */

    
    

    
    // for (let i = 0; i < 4; i++) {
    //     let cells = [];
    //     let tempDay = dayStart;
        

        // if (i % 2 === 0) {
        //     for (let j = 0; j < 12; j++) {
        //         formattedHour = dateFns.format(currHour, dateFormat);
        //         if (i === 0) {
        //             cells.push(<tr className="row hour-cell" key={i}>
        //                 {formattedHour}
        //             </tr>)
        //         } else {
        //             cells[j].push(<th className="row hour-cell" key={i}>
        //                 {formattedHour}
        //             </th>)
        //         }
        //         keys.push(currHour);
        //         currHour = dateFns.addHours(currHour, 1);
        //     }
        //     tempDay = dateFns.addHours(tempDay, 1);
        //     hours.push(<div className="column hour-col" key={i + 12}>{cells}</div>)
        // } else {
        //     for (let j = 0; j < 12; j++) {
        //         cells.push(<th className="row empty hour-cell"
        //             onClick={() => onHourClick(keys[j])} key={keys[j]}>
        //             &emsp;&emsp;&emsp;&emsp;&emsp;
        //         </th>)

        //     }
        //     tempDay = dateFns.addHours(tempDay, 1);
        //     hours.push(<div className="column hour-cell">{cells}</div>)
        // }

        createTable() {
            this.setUpArray();
            this.state.table.map((row) => {
                const { id, time1, empty1, time2, empty2 } = row;
                return (
                    <tr key={id}>
                        <td>{time1}</td>
                        <td>{empty1}</td>
                        <td>{time2}</td>
                        <td>{empty2}</td>
                    </tr>
                )
            })
        }
    


    render(){
        return (
            // <table className="day-view">{hours}</table>
            <table className="day-view">
                <tbody>
                    {this.createTable()}
                </tbody>
            </table>
        )
    }
}

export default DayView;