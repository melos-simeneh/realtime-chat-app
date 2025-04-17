const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const requiredEnvVars = ["PORT", "MONGO_URL", "NODE_ENV", "JWT_SECRET"];
exports.checkEnv = () => {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (!missingEnvVars.length) return;

  console.error(
    `[Error]: Missing required environment variables: [${missingEnvVars.join(
      ", "
    )}]`
  );
  process.exit(1);
};

exports.timestamp = () => dayjs().format("YYYY-MM-DD hh:mm:ss A");

exports.generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
};

exports.morganConfig = function (tokens, req, res) {
  return [
    `[${exports.timestamp()}]`,
    tokens["remote-addr"](req, res),
    `"${tokens.method(req, res)} ${tokens.url(req, res)} HTTP/${
      req.httpVersion
    }"`,
    tokens.status(req, res),
    `${tokens["response-time"](req, res)} ms`,
    `"Referrer: ${tokens.referrer(req, res) || "-"}` + `"`,
    `"User-Agent: ${tokens["user-agent"](req, res)}"`,
  ].join(" | ");
};
