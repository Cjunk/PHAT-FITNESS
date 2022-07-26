import React, { Component } from "react";
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
          <nav className="App-header">
            <h1 className="App-title">PHAT_FITNESS</h1>
          </nav>
        </div>
      );
  }
}

export default Banner;
