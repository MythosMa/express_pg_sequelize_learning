const UserModel = require("../models").User;
const dayjs = require("dayjs");

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
      throw error;
    });
};
