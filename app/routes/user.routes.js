const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");
const authMiddleware = require("../middleware/auth");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", [verifySignUp.validateEmail], userController.createUser);
router.post("/login", authController.login);
router.get("/", [authMiddleware.verifyToken], userController.findAll);
router.get("/:id", [authMiddleware.verifyToken], userController.findUserById);
router.put("/:id", [authMiddleware.verifyToken], userController.updateUserById);
router.delete("/:id", [authMiddleware.verifyToken], userController.deleteUserById);

module.exports = router;