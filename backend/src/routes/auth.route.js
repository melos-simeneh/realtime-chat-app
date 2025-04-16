const { Router } = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");
const {
  validateRequestBody,
  validateSignup,
} = require("../middlewares/validation.middleware");

const router = Router();

router.post("/signup", validateRequestBody, validateSignup, signup);
router.post("/login", validateRequestBody, login);
router.post("/logout", logout);

module.exports = router;
