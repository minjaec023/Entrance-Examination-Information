module.exports = (sequelize, DataTypes) => {
  let engratiomodel = sequelize.define(
    "EngRatio",
    {
      /* columns */

      division: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        primaryKey: true,
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
      /* options */

      tableName: "engratio",
      timestamps: false,
    }
  );
  engratiomodel.removeAttribute("id");
  return engratiomodel;
};
