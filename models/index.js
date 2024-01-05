const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

const basename = path.basename(__filename);
let config = require(`${__dirname}/../config/config.json`);
config = Object.assign(
  ...Object.keys(config).map((key) => {
    return { [key]: process.env[config[key]] };
  })
);

const db = {};

let sequelize = new Sequelize({ ...config, dialect: "postgres" });

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(async (modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    await db[modelName].sync({ alter: true });
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
