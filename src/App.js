import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";

import Chapters from "./react-components/Chapters";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

    state = {
        cart: [],
        username:
            localStorage.getItem("username") !== null
                ? localStorage.getItem("username")
                : "visitor",
        accountType:
            localStorage.getItem("accountType") !== null
                ? localStorage.getItem("accountType")
                : "Visitor",
        loggedIn: "false"
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                localStorage.getItem("loggedIn") === "true"
                                ? <Redirect to="/home"/>
                                : <Chapters state={this.state} />
                            )}
                        />

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
