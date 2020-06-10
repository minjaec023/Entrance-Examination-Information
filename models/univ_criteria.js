module.exports = (sequelize, DataTypes) => {
  let criteriamodel = sequelize.define(
    "UnivCriteria",
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
      c_korean: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      c_math: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      c_english: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      c_inquiry: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      tableName: "univcriteria",
    }
  );
  criteriamodel.removeAttribute("id");
  criteriamodel.removeAttribute("createdAt");
  criteriamodel.removeAttribute("updatedAt");
  return criteriamodel;
};
