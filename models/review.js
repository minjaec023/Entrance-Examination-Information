module.exports = (sequelize, DataTypes) => {
    let reviewmodel = sequelize.define(
      "Review",
      {
        review_id: {
          type: DataTypes.INTEGER(10),
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING(45),
          unique: true,
          allowNull: false,
        },
        grade: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
        },
        contents: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        univ_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        depart_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
      },
      {
        tableName: "review",
        timestamps: false
      }
    );
    reviewmodel.removeAttribute("id");
    return reviewmodel;
  };