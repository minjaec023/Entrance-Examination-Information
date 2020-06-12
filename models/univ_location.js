module.exports = (sequelize, DataTypes) => {
  let univlocmodel = sequelize.define(
    "UnivLocation",
    {
      /* columns */

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
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longirude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      /* options */

      tableName: "univlocation",
      timestamps: false,
      charset: "utf8",
    }
  );
  univlocmodel.removeAttribute("id");
  return univlocmodel;
};
