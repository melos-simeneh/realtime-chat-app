require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.route");
const mongoDBConnection = require("./lib/db");

const { globalErrorHandler } = require("./lib/errorHandler");
const { timestamp, checkEnv, morganConfig } = require("./lib/utils");
const { app, server } = require("./lib/socket");

checkEnv();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());
app.use(morgan(morganConfig));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", routes);

// Global Error Handler (MUST be last middleware)
app.use(globalErrorHandler);

const PORT = process.env.PORT ?? 5000;
const MODE = process.env.NODE_ENV;
server.listen(PORT, async () => {
  console.log(
    `[${timestamp()}] Chat Server is running on ${MODE} mode at port ${PORT}`
  );
  await mongoDBConnection();
});
