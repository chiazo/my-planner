import React from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import CalendarDay from "./calendar/Calendar-Day";
import CalendarWeek from "./calendar/Calendar-Week";

class Main extends React.Component {
    render() {
        return(
            <section className="main">
                <Navigation/>
                <CalendarDay/>
                <CalendarWeek/>
            </section>
        )
    }
}

export default Main;