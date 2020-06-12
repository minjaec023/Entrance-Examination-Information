const path = require("path");
const Sequelize = require("sequelize");
const { QueryInterface } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.University = require("./university")(sequelize, Sequelize);
db.Department = require("./department")(sequelize, Sequelize);
db.UnivCriteria = require("./univ_criteria")(sequelize, Sequelize);
db.EngRatio = require("./eng_ratio")(sequelize, Sequelize);
db.UnivLocation = require("./univ_location")(sequelize, Sequelize);

/* 모델 관계 정의 */

db.Department.belongsTo(db.University, {
  foreignKey: { name: "univ_id", allowNull: false, primaryKey: true },
  targetKey: "univ_id",
  onDelete: "CASCADE",
});
db.EngRatio.belongsTo(db.University, {
  foreignKey: { name: "univ_id", allowNull: false, primaryKey: true },
  targetKey: "univ_id",
  onDelete: "CASCADE",
});
db.UnivCriteria.belongsTo(db.University, {
  foreignKey: { name: "univ_id", allowNull: false, primaryKey: true },
  targetKey: "univ_id",
  onDelete: "CASCADE",
});
db.UnivLocation.belongsTo(db.University, {
  foreignKey: { name: "univ_id", allowNull: false, primaryKey: true },
  targetKey: "univ_id",
  onDelete: "CASCADE",
});

module.exports = db;
