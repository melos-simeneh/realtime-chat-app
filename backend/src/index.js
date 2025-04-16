require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.route");
const mongoDBConnection = require("./lib/db");

const { globalErrorHandler } = require("./lib/errorHandler");
const { timestamp, checkEnv } = require("./lib/utils");

const app = express();

checkEnv();

app.use(express.json());

app.use("/api/auth", authRoutes);

// Global Error Handler (MUST be last middleware)
app.use(globalErrorHandler);

const PORT = process.env.PORT ?? 5000;
const MODE = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(
    `[${timestamp()}] Chat Server is running on ${MODE} mode at port ${PORT}`
  );
  mongoDBConnection();
});
