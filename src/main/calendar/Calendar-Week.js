// import React from "react";
// import "./Calendar-Week.css";
// import * as dateFns from "date-fns";

// class CalendarWeek extends React.Component {
//     state = {
//         currMonth: new Date(),
//         currDate: new Date(),
//         endOfWeek: dateFns.addDays(new Date(), 6)
//     };

//     renderHeader() {
//         const dateFormat = "MMM d";

//         return (
//             <div className="header-day row">
//                 <div className="left-arr icon header"
//                     onClick={this.prevDay} >
//                     left_arrow
//                 </div>
//                 <div className="date header">
//                     <span>
//                         Week of&nbsp;
//                         {dateFns.format(this.state.currDate, dateFormat)} -&nbsp;
//                         {dateFns.format(this.state.endOfWeek, dateFormat)}
//                     </span>
//                 </div>
//                 <div className="right-arr icon header"
//                     onClick={this.nextDay}>
//                     right_arrow
//                 </div>
//             </div>
//         );
//     }

//     renderDays() {
//         const dateFormat = "EEE d";
        
//         const days = [];
//         let dayStart = dateFns.startOfDay(this.state.currDate);
//         const dayEnd = dateFns.endOfDay(this.state.currDate);
//         dayStart = dateFns.addHours(dayStart, 6);


//         // setting up hour view on left
//         days.push(
//             <div className="column">
//                 <div className="row">6</div>
//                 <div className="row">7</div>
//                 <div className="row">8</div>
//                 <div className="row">9</div>
//                 <div className="row">10</div>
//                 <div className="row">11</div>
//                 <div className="row">12</div>
//                 <div className="row">1</div>
//                 <div className="row">2</div>
//                 <div className="row">3</div>
//                 <div className="row">4</div>
//                 <div className="row">5</div>
//                 <div className="row">6</div>
//                 <div className="row">7</div>
//                 <div className="row">8</div>
//                 <div className="row">9</div>
//                 <div className="row">10</div>
//                 <div className="row">11</div>
//                 <div className="row">12</div>
//             </div>
//         )

//         var startDate = this.state.currDate; // dateFns.startOfWeek(this.state.currMonth);

//         for (let i = 0; i < 7; i++) {
//             days.push(
//                 <div className="column" key={i}>
//                     {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
//                 </div>

//             );
//         }

//         return <div className="week-view row">{days}</div>
//     }
//     // renderHours() {

//     // };

//     onCellClick = hour => {

//     };

//     nextDay = () => {
//         this.setState({
//             currDate: dateFns.addDays(this.state.currDate, 1),
//             endOfWeek: dateFns.addDays(this.state.currDate, 7)
//         });
//         this.renderDays();
//     };

//     prevDay = () => {
//         this.setState({
//             currDate: dateFns.subDays(this.state.currDate, 1),
//             endOfWeek: dateFns.addDays(this.state.currDate, 5)
//         });
//         this.renderDays();
//     };

//     render() {
//         return (
//             <div className="calendar-day row">
//                 {this.renderHeader()}
//                 {this.renderDays()}
//                 {/* {this.renderHours()} */}
//                 {/* <div>Cells</div> */}
//             </div>
//         )
//     }
// }

// export default CalendarWeek;