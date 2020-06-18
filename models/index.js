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
db.User_score = require("./user_score")(sequelize, Sequelize);

db.University = require("./university")(sequelize, Sequelize);
db.Department = require("./department")(sequelize, Sequelize);
db.UnivCriteria = require("./univ_criteria")(sequelize, Sequelize);
db.EngRatio = require("./eng_ratio")(sequelize, Sequelize);
db.UnivLocation = require("./univ_location")(sequelize, Sequelize);

db.Review = require("./review")(sequelize, Sequelize);
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
db.User_score.belongsTo(db.User, {
  foreignKey: { name: "user_id", allowNull: false, primaryKey: true },
  targetKey: "user_id",
  onDelete: "CASCADE",
});
db.Review.belongsTo(db.User, {
  foreignKey: { name: "user_id", allowNull: false, primaryKey: true},
  targetKey: "user_id",
  onDelete: "CASCADE",
})
db.Review.belongsTo(db.University, {
  foreignKey: { name: "univ_id", allowNull: false, primaryKey: true },
  targetKey: "univ_id",
  onDelete: "CASCADE",
});

db.User.hasMany(db.User_score, {foreignKey: "user_id"});

module.exports = db;
