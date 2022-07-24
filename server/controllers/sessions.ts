/* SERVER
    FILE: SESSIONS API handeler  
    DATE:   2022
    DESCRIPTION: Session control for PHAT_FITNESS
    USAGE: Loggin into PHAT_FITNESS. Loggin out of PHAT_FITNESS. Creating sessions 
      router.post('/login'):   
      params are as follows
        {
          email: <the users email>,
          password: <the users unencrypted password>
        }
        The password length is validated. 
        returns success(200) OK if successful login
        
     */
// ***************************      *****************************************************************************************
// SET UP THE INCLUDES
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS";
const BAD_CREDENTIALS_STATUS = 403;
const USERS_TABLE_NAME = "users";
// ********************************************************************************************************************
// CREATE THE ROUTER
router.post(`/login`, (req, res) => {
  // VALIDATE THE PASSED VARIABLES
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ status: false, message: "Missing email details" });
    return;
  }
  if (!password) {
    res.status(400).json({ status: false, message: "Missing Password" });
    return;
  }
  if (password.length < 4 || password.length > 255) {
    res.status(400).json({ status: false, message: "Incorrect Password length" });
    return;
  }
  /*
    PRE condition: validated password and email. 
    POST: 
    1)  If the user has an account and authenticates return stats 200 OK. Also a cookies containing gitConnectId,email and name
    2)  Else if the user does not authenticate, a message of BAD CREDENTIALS along with the associated status code.
  */

  db.query(
    `SELECT email,username,users.id,firstname,hashed_password FROM ${USERS_TABLE_NAME} JOIN hashed_passwords ON users.id = hashed_passwords.id WHERE email = $1;`,
    [email]
  )
    .then((dbres) => {
      if (req.session.authenticated) {
        console.log("This user is already logged in ", req.session.body.firstname); //TODO: delete console.log
        res.json(req.session);
      } else {
        bcrypt.compare(password + email.toUpperCase(), dbres.rows[0].hashed_password, function (err, result) {
          if (result) {
            delete dbres.rows[0].hashed_password;
            console.log("The user has successfully logged in"); //TODO: delete console.log
            req.session.authenticated = true;
            req.session.body = dbres.rows[0];
            res.cookie("phat_fitness", dbres.rows[0].id);
            res.cookie("email", dbres.rows[0].email);
            res.cookie("username", dbres.rows[0].githubname, { httpOnly: false });
            res.redirect("/");
          } else {
            //  Wrong password correct email.
            res.status(BAD_CREDENTIALS_STATUS).json({ status: false, message: BAD_CREDENTIALS });
          }
        });
      }
    })
    .catch((reason) => {
      // The user was not found in the database
      res.status(BAD_CREDENTIALS_STATUS).json({ status: false, message: BAD_CREDENTIALS });
    });
});

//  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//  System below
function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}

router.get("/", isAuthenticated, (req, res) => {
  res.status(200).json({
    githubname: req.session.body.githubname,
    id: req.session.body.id,
    email: req.session.body.email,
    success: true,
  });
});
router.delete("/", isAuthenticated, (req, res) => {
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
  res.json({ success: true });
});

router.get(["/", `/anthing`], (req, res) => {
  //  If the user is not authenticated then come to this route. FIXME: clean up
  res.json({
    name: req.session.name,
    email: req.session.email,
    message: "User not authenticated",
    success: false,
  });
});

router.delete("/", (req, res) => {
  //  Attempt to delete however the user wasnt even logged in to begin with
  res.json({ success: false });
});
module.exports = router;
