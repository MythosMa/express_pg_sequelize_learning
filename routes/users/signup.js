const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/userController");

router.post("/", (req, res, next) => {
  UserController.signupUser(req.body)
    .then((user) => {
      res.json(user, 0, "用户创建成功");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
