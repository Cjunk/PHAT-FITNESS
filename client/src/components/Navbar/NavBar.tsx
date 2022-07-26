import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "../Navbar.css";
class Navbar extends Component {
    state = { clicked: false }
    
  render() {
    return (
      <nav className="NavBarItems">
        <h1 className="navbar-logo">Phat_Fitness</h1>
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? "fas fa-times": "fas fa-bars"}></i>
          <ul>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navbar;
