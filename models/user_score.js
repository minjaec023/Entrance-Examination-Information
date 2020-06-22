module.exports = (sequelize, DataTypes) => { 
    let usermodel = sequelize.define("User_score", { 
        user_id: { 
        /* column 속성들 */ 
            type: DataTypes.STRING(45), 
            unique: true,
            primaryKey: true,
            allowNull: false, 
        }, 
        month: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
        sp: { 
            type: DataTypes.STRING(10), 
            allowNull: false, 
        },
        korean: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        english: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
        math: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        inquiry: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
    },{ 
        tableName: "user_score",
        timestamps: false,
        charset: "utf8",
    });
    usermodel.removeAttribute('id');
    return usermodel
}