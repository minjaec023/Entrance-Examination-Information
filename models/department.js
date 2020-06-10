module.exports = (sequelize, DataTypes) => {
  let departmentmodel = sequelize.define(
    "Department",
    {
      univ_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
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
      tableName: "department",
    }
  );
  departmentmodel.removeAttribute("id");
  departmentmodel.removeAttribute("createdAt");
  departmentmodel.removeAttribute("updatedAt");
  return departmentmodel;
};
