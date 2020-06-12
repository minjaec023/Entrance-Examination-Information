module.exports = (sequelize, DataTypes) => {
  let universitymodel = sequelize.define(
    "University",
    /* columns */
    {
      univ_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      univ_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    } /* options */,
    {
      tableName: "university",
      timestamps: false,
      charset: "utf8",
    }
  );
  universitymodel.removeAttribute("id");
  return universitymodel;
};
