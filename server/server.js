const express = require('express');
const cors = require('cors');

const app = express();

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Jericho', lastName: 'Sharman'},
    {id: 3, firstName: 'Rima', lastName: 'Masri'},
  ];

  res.json(customers);
});

const port = 5000;

console.log(`Server running on port ${port}`)
app.listen(port);