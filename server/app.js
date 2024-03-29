// Config env
require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");
const cors = require("cors");
const { Database } = require("./configs");
const https = require("https");
const fs = require("fs");
const path = require("path");
// const sslcert = require("../ssl/certificate.crt");
// setup connect mongodb by mongoose
mongoClient
  .connect(
    `mongodb+srv://todoApp:${Database}@atlascluster.vnmjcyr.mongodb.net/test`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected database from mongodb."))
  .catch((error) =>
    console.error(`❌ Connect database is failed with error which is ${error}`)
  );

const app = express();

//const deckRoute = require("./routes/deck");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const task = require("./routes/task");
const notice = require("./routes/notice");
// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
// Routes

app.use("/users", userRoute);
app.use("/projects", projectRoute);
// Routes
app.use("/tasks", task);
app.use("/notices", notice);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get("port") || 3000;
const cert = fs.readFileSync(path.resolve(__dirname, "./ssl/certificate.crt"));
const key = fs.readFileSync(path.resolve(__dirname, "./ssl/privatekey.key"));
https
  .createServer(
    {
      cert,
      key,
    },

    app
  )
  .listen(port, () => console.log(`Server is listening on port ${port}`));
