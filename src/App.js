import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";

import Chapters from "./react-components/Chapters";
import Login from "./react-components/Login";
import Home from "./react-components/Home";

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
                  render={() => (<Home />
                  )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
}

export default App;
