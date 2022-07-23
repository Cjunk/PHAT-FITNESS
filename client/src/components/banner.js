import React, { Component } from "react";
import logo from "../media/logo.svg";
import "./banner.css";
class Banner extends Component {
  constructor() {
    super();
    this.state = {
      menus: [],
    };
  }
  render() {
      return (
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">PHAT_FITNESS</h1>
          </header>
        </div>
      );
  }
}

export default Banner;