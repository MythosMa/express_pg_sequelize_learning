const UserModel = require("../models").User;
const dayjs = require("dayjs");

module.exports.signupUser = async function (user) {
  if (!user.username || !user.password || !user.realName) {
    return Promise.reject("缺少必要信息");
  }
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
      throw error;
    });
};
