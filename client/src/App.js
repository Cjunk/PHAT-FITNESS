import React, { Component } from 'react';
import './App.css';
import Customers from "./components/customers";
import Banner from "./components/banner";
import NavBar from "./components/Navbar/Navbar"
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* <Banner /> */}
        <Customers />
      </div>
    );
  }
}

export default App;
