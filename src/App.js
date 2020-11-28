import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";

import Chapters from "./react-components/Chapters";
import Login from "./react-components/Login";

import Header from "./react-components/Header";
import Footer from "./react-components/Footer";
import HomePage from "./react-components/HomePage";
import Team from "./react-components/Team";
import Sponsors from "./react-components/Sponsors";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route
                exact path="/"
                render={() => (<Chapters />
                )}
              />

              <Route
                exact path="/login"
                render={() => (<Login />
                )}
              />

              <Route
                exact path="/home"
                render={() => (
                  <div>
                    <Header />
                    <HomePage />
                    <Footer />
                  </div>
                )}
              />

              <Route
                exact path="/team"
                render={() => (
                  <div>
                    <Header />
                    <Team />
                    <Footer />
                  </div>
                )}
              />

              <Route
                exact path="/sponsors"
                render={() => (
                  <div>
                    <Header />
                    <Sponsors />
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
