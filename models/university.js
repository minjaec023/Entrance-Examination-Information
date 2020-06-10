module.exports = (sequelize, DataTypes) => {
  let universitymodel = sequelize.define(
    "University",
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
    },
    {
      tableName: "university",
    }
  );
  universitymodel.removeAttribute("id");
  universitymodel.removeAttribute("createdAt");
  universitymodel.removeAttribute("updatedAt");
  return universitymodel;
};
