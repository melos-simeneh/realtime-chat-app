const dayjs = require("dayjs");

exports.timestamp = () => dayjs().format("YYYY-MM-DD hh:mm:ss A");
