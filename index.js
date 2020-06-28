require('./controller/mongoose');
require('./cron/sheduler');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");

const Role = db.role;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
//require('./routes/user.routes')(app);
require('./routes/memo.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });