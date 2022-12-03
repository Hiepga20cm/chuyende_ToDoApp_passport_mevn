// Config env
require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");
const cors = require("cors");
const { Database, PORT } = require("./configs");

// setup connect mongodb by mongoose
mongoClient
    .connect(
        "mongodb+srv://todoApp:90AitZkNKIRK1DEq@atlascluster.vnmjcyr.mongodb.net/test", {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
    )
    .then(() => console.log("✅ Connected database from mongodb."))
    .catch((error) =>
        console.error(`❌ Connect database is failed with error which is ${error}`)
    );

const app = express();

app.get("/status", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "ok",
    });
});

//const deckRoute = require("./routes/deck");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
// Routes

app.use("/users", userRoute);
app.use("/projects", projectRoute);
// Routes
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
const port = app.get("port") || { PORT };
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));