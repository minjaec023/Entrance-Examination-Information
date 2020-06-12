module.exports = (sequelize, DataTypes) => {
  let criteriamodel = sequelize.define(
    "UnivCriteria",
    {
      /* columns */

      division: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        primaryKey: true,
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
    } /* options */,

    {
      tableName: "univcriteria",
      timestamps: false,
    }
  );
  criteriamodel.removeAttribute("id");
  return criteriamodel;
};
