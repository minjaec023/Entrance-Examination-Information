module.exports = (sequelize, DataTypes) => {
  let departmentmodel = sequelize.define(
    "Department",
    {
      /* columns */

      depart_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      standard_score: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      percentile: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      /* options */

      tableName: "department",
      charset: "utf8",
      timestamps: false,
    }
  );
  departmentmodel.removeAttribute("id");
  return departmentmodel;
};
