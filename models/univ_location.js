module.exports = (sequelize, DataTypes) => {
  let univlocmodel = sequelize.define(
    "UnivLocation",
    {
      univ_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      do: {
        type: DataTypes.STRING(30),
      },
      city: {
        type: DataTypes.STRING(30),
      },
      gu: {
        type: DataTypes.STRING(30),
      },
      latitude: {
        type: DataTypes.DOUBLE(30),
        allowNull: false,
      },
      longirude: {
        type: DataTypes.DOUBLE(30),
        allowNull: false,
      },
    },
    {
      tableName: "univlocation",
    }
  );
  univlocmodel.removeAttribute("id");
  univlocmodel.removeAttribute("createdAt");
  univlocmodel.removeAttribute("updatedAt");
  return univlocmodel;
};
