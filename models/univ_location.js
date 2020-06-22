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