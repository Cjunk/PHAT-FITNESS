// SET UP THE INCLUDES
require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const db = require("./server/db/db");
const { exit } = require("process");
const cors = require("cors");
// ********************************************************************************************************************
// CONSTANTS
const appSecretKey = process.env.EXPRESS_SESSION_SECRET_KEY;
const PORT = process.env.PORT || 3001;
const app = express();
const SERVER_COMMS_TAB_SPACING = 10;
let API_CALLS = 0;
let HIDDEN_API_CALLS = 0;

//  FIXME: Change these for any other application moving forward
// const challengesController = require("./controllers/challenges"); //  \
// const usersController = require("./controllers/users"); //    >  These are application specific
const sessionController = require("./server/controllers/sessions"); //  /

// ********************************************************************************************************************
// SET UP THE APP
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./client/build"));
app.use(express.json());
app.use("/", (req, res, next) => {
  // 3 paramaters = middleware
  if (
    !req.path.startsWith("/js/") &&
    !req.path.startsWith("/css/") &&
    !req.path.startsWith("/api/session") &&
    !req.path.startsWith("/img/gclogo.png") &&
    !req.path.startsWith("/tmp/") &&
    !req.path.startsWith("/utils/")
  ) {
    // console.log(`PARAMS 2: ${req.client.on}`);
    console.log("*****************************************************");
    console.log("API CALLS TO SERVER = ", ++API_CALLS, "HIDDEN API CALLS TO SERVER = ", HIDDEN_API_CALLS);
    console.log("*******************************************************************");
    console.log(`* SERVER COMMUNICATION on ${new Date()} `);
    console.log(
      `* METHOD = ${req.method.padEnd(SERVER_COMMS_TAB_SPACING)} PATH = ${req.path.padEnd(
        SERVER_COMMS_TAB_SPACING
      )} HOST: ${req.headers.host} `
    );
    console.log(
      `* originalUrl: ${req.originalUrl.padEnd(SERVER_COMMS_TAB_SPACING)} PATH = ${req.path.padEnd(
        SERVER_COMMS_TAB_SPACING
      )} accept: ${req.cookies}`
    );
    console.log("* cookie = ", req.headers.cookie);
    console.log("*********************************************************");
  } else {
    HIDDEN_API_CALLS++;
  }
  next();
});
app.use((err, req, res, next) => {
  // 4 parameters = error handeler
  console.log(`I am ERROR middlewear ${new Date()} ${req.method} ${req.path}`);
  console.log(err);
  res.status(500).json({ message: "Unknown SERVER/INSERT error occurred" });
  next();
});
app.use(
  expressSession({
    secret: appSecretKey,
    cookie: { maxAge: 2000000 },
    resave: true,
    saveUninitialized: true,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);
app.use("/api/", sessionController);
app.get("/api/customers", cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jericho", lastName: "Sharman" },
    { id: 3, firstName: "Rima", lastName: "Masri" },
  ];

  res.json(customers);
});
// ********************************************************************************************************************
// DEVELOPER comms
if (process.env.DATABASE) {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
  console.log(`DATABASE ONLINE: ${process.env.DATABASE}`);
} else {
  console.log("No Database has been setup. Go to the .env file and place the database name");
}
