import React from "react";
import "./Navigation.css";

class Navigation extends React.Component {
    render() {
        return (
            <div className="navigation row">
                <section className="nav-day">
                    Day
                </section>
                <section className="nav-week">
                    Week
                </section>
                <section className="nav-month">
                    Month
                </section>
                <section>
                    Archive
                </section>
                <section>
                    Migrated Tasks
                </section>
                <section>
                    Incomplete
                </section>
                <section>
                    Completed
                </section>                           
            </div>
        )
    }
}

export default Navigation;

/**
 * 
 */