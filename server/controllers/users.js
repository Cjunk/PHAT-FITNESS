/* PHAT_FITNESS SERVER 
    FILE: USERS API handeler 
    AUTHOR: Jericho Sharman   
    DATE: 07/2022   
    DESCRIPTION:*/
// ********************************************************************************************************************

// SET UP THE INCLUDES
const gitHubApi = {
  getUserDetails: `https://api.github.com/users/`,
};
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
const axios = require("axios");
const USERS_TABLE_NAME = "users";
require("dotenv").config();
// const cloudinary = require("cloudinary").v2;
// cloudinary.cloudinary_js_config();
// ********************************************************************************************************************
/*
  To register a new users, you MUST pass the following params as a minimum. The hashed password is stored on a separate table
  params
  {
      githubName: Their github name 
      userType: Type of users (enter '3' for Developer )
      profiletype: the type of profile they have on GitConnect (set to '1' Public)
      email: <users name>
      password: <users password>
  }
*/

router.post(`/register`, (req, res) => {
  // REGISTER A NEW USER
  if (!req.body.name || !req.body.email || !req.body.password) {
    // Ensure data is present
    res.status(400).json({ status: false, message: "Missing information" });
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    // Confirm passwords match
    res.status(400).json({ status: false, message: "Password do not match" });
    return;
  }
  if (
    // Validate password and name lengths
    req.body.name.length > 20 ||
    req.body.email.length > 100 ||
    req.body.password.length > 20 ||
    req.body.password.length < 4
  ) {
    res.status(400).json({ status: false, message: "Incorrect password length" });
    return;
  }
  // create the hashed password from password and email.
  db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]).then((dbres) => {
    if (dbres.rows[0]) {
      res.json({ status: false, message: "This email already exists" });
    } else {
      const hash = createHash(req.body.email, req.body.password, 5);
      const userData = [req.body.email, req.body.name, hash, 1];
      db.query(`INSERT INTO users (email,fname,password_hash,userType) VALUES($1,$2,$3,$4);`, userData).then(
        (dbres) => {
          console.log("************************************ NEW REGISTERED USER IS ADDED. SENDING DATA BACK TO CLIENT"); //
          res.status(200).json({
            status: true,
            firstTimeRego: "yes",
            message: "New user added",
          }); // respond new user successfully added.
        }
      );
    }
  });
});
router.get(`/getUsers`, (req, res) => {
  // TODO: REmove this so random people cannot view all the users in the database. This is for testing only
  result = dbSelectQuery(`SELECT * FROM users;`, res);
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jericho", lastName: "Sharman" },
    { id: 3, firstName: "Rima", lastName: "Masri" },
  ];
  // res.json(customers);
});
// ********************************************************************************************************************
// INTERNAL FUNCTIONS
function createHash(email, password) {
  return bcrypt.hashSync(password + email.toUpperCase(), 10, null);
}
function dbSelectQuery(theQuery, res) {
  //  Function to execute SQL code in the database
  result = db
    .query(theQuery)
    .then((dbResults) => {
      res.json(dbResults.rows);
    })
    .catch((reason) => {
      console.log("INTERNAL DATABASE ERROR", reason);
      res.status(500).json({ message: "No data in database" });
    });
  return result;
}
module.exports = router;
