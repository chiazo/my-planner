import React from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Landing from "./landing/Landing"

class Main extends React.Component {
    render() {
        return(
                <section className="main">
                
                {/* <Navigation/> */}
                <Landing/>
                
            </section>
        )
    }
}

export default Main;