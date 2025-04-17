const bcryptjs = require("bcryptjs");

exports.hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};
exports.hashPasswordSync = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};
exports.verifyPassword = async (password, hashed_password) => {
  return await bcryptjs.compare(password, hashed_password);
};
