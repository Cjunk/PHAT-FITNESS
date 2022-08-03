// import axios from 'axios';
import axios from 'axios';
import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
 
  }
  componentDidMount() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    // fetch('/api/customers')
    //   .then((res) => {
    //     console.log("am here",res); res.json() })
    //   .then((customers) => {
    //     console.log("customers", customers);
    //     this.setState({ customers })
    //   });
    fetch('/api/customers',).then(res =>  res.json())
      .then(customers => {
        this.setState({ customers });  
        console.log(customers)
      })
      // 
  }

  render() {
    return (
      <div>
        <h2>Members</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
