import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Chapters from "./react-components/Chapters";
import Login from "./react-components/Login";
import Header from "./react-components/Header";
import Footer from "./react-components/Footer";
import HomePage from "./react-components/HomePage";
import Team from "./react-components/Team";
import Events from "./react-components/Events"
import Sponsors from "./react-components/Sponsors";

import "bootstrap/dist/css/bootstrap.min.css";

import { readCookie } from "./actions/user";
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        readCookie(); // Check if a user is already logged in.
    }

    // User information.
    state = {
        username:
            sessionStorage.getItem("username") !== null
                ? sessionStorage.getItem("username")
                : "visitor",
        accountType:
            sessionStorage.getItem("accountType") !== null
                ? sessionStorage.getItem("accountType")
                : "Visitor",
        loggedIn:
            sessionStorage.getItem("loggedIn") !== null
                ? sessionStorage.getItem("loggedIn")
                : "false"
    }


    render() {
        const loggedIn = this.state.loggedIn;

        return (
          <div>
              <BrowserRouter>
                  <Switch>
                      <Route
                          exact path="/"
                          render={({ history }) => (<Chapters history={history} app={this}/>
                          )}
                      />

                      <Route
                          exact path="/login"
                          render={({ history }) => (
                            <div>
                                { /* If logged in, redirect to homepage instead. */ }
                                {loggedIn === "false"
                                  ? <Login history={history} app={this}/>
                                  :
                                  <div>
                                      <Header />
                                      <HomePage history={history} app={this}/>
                                      <Footer />
                                  </div>}
                            </div>
                          )}
                      />

                      <Route
                          exact path="/home"
                          render={({ history }) => (
                              <div>
                                  <Header />
                                  <HomePage history={history} app={this}/>
                                  <Footer />
                              </div>
                          )}
                      />

                      <Route
                          exact path="/team"
                          render={({ history }) => (
                              <div>
                                  <Header />
                                  <Team history={history} app={this}/>
                                  <Footer />
                              </div>
                          )}
                      />

                      <Route
                          exact path="/events"
                          render={({ history }) => (
                              <div>
                                  <Header />
                                  <Events history={history} app={this}/>
                                  <Footer />
                              </div>
                          )}
                      />

                      <Route
                          exact path="/sponsors"
                          render={({ history }) => (
                              <div>
                                  <Header />
                                  <Sponsors history={history} app={this}/>
                                  <Footer />
                              </div>
                          )}
                      />
                  </Switch>
              </BrowserRouter>
          </div>
        );
    }
}

export default App;
