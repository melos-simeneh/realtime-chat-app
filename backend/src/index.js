require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index.route");
const mongoDBConnection = require("./lib/db");

const { globalErrorHandler } = require("./lib/errorHandler");
const { timestamp, checkEnv } = require("./lib/utils");
const { app, server } = require("./lib/socket");

checkEnv();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", routes);

// Global Error Handler (MUST be last middleware)
app.use(globalErrorHandler);

const PORT = process.env.PORT ?? 5000;
const MODE = process.env.NODE_ENV;
server.listen(PORT, () => {
  console.log(
    `[${timestamp()}] Chat Server is running on ${MODE} mode at port ${PORT}`
  );
  mongoDBConnection();
});
