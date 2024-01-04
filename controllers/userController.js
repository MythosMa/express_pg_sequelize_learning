const UsersModel = require("../models").Users;

module.exports.signupUser = function (user) {
  if (!user.username || !user.password || !user.realName) {
    return Promise.reject("缺少必要信息");
  }
  return UsersModel.create({
    ...user,
  })
    .then((userResult) => {
      const userResultJson =
        userResult && typeof userResult === "object"
          ? userResult.toJSON()
          : userResult;
      const data = {};

      return data;
    })
    .catch((error) => {
      throw error;
    });
};
