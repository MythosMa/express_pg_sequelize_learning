const { Model } = require("sequelize");
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Roles, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      realName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      createTime: DataTypes.DATE,
      lastLoginTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });

  return User;
};
