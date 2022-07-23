import React, { Component } from 'react';
import './App.css';
import Customers from './components/customers';
import Banner from './components/banner';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner />
        <Customers />
      </div>
    );
  }
}

export default App;
