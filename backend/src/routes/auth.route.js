const { Router } = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/auth.controller");
const {
  validateRequestBody,
  validateSignupBody,
  validateLoginBody,
  validateUpdateProfileBody,
} = require("../middlewares/validation.middleware");
const { protectRoute } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/signup", validateRequestBody, validateSignupBody, signup);
router.post("/login", validateRequestBody, validateLoginBody, login);
router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  validateRequestBody,
  validateUpdateProfileBody,
  updateProfile
);

router.get("/check", protectRoute, checkAuth);

module.exports = router;
