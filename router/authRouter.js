const router = require("express").Router();
const authController = require("../controller/authController");
const { verifyToken } = require("../controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", authController.getAllUsers);
router.get("/:id", verifyToken, authController.getUser);
router.delete("/:id", authController.deleteUser);
router.patch("/:id", authController.updateUser);

module.exports = router;
