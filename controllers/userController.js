const UserModel = require("../models").User;
const dayjs = require("dayjs");
const { UniqueConstraintError } = require("sequelize");

module.exports.signupUser = async function (user) {
  return UserModel.create({
    ...user,
  })
    .then((userResult) => {
      const userResultJson =
        userResult && typeof userResult === "object"
          ? userResult.toJSON()
          : userResult;
      return {
        ...userResultJson,
        password: undefined,
      };
    })
    .catch((error) => {
      const errorData = {
        status: 500,
        data: null,
        result: -1,
        message: "服务器错误：" + error,
      };
      if (error instanceof UniqueConstraintError) {
        errorData = {
          status: 409,
          data: null,
          result: -1,
          message: "用户已存在",
        };
      }
      return Promise.reject(errorData);
    });
};
