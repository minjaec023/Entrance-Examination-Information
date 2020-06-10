module.exports = (sequelize, DataTypes) => {
  let engratiomodel = sequelize.define(
    "EngRatio",
    {
      univ_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      division: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
      first_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      second_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      third_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      fourth_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      fifth_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      sixth_grade: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      tableName: "engratio",
    }
  );
  engratiomodel.removeAttribute("id");
  engratiomodel.removeAttribute("createdAt");
  engratiomodel.removeAttribute("updatedAt");
  return engratiomodel;
};
