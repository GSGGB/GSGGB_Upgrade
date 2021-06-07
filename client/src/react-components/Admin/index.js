import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import "./styles-mobile.css";

class Admin extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/admin");
        document.title = "GSGGB U of T | Admin Page";
    }


    render() {
      return (
          <BrowserRouter>
              <div>
              </div>
          </BrowserRouter>
        );
    }
}

export default Admin;
