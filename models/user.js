module.exports = (sequelize, DataTypes) => { 
    let usermodel = sequelize.define("User", { 
        user_id: { 
        /* column 속성들 */ 
            type: DataTypes.STRING(45), 
            unique: true,
            allowNull: false, 
        }, 
        user_name: { 
            type: DataTypes.STRING(100), 
            allowNull: false, 
        }, 
        user_pw: { 
            type: DataTypes.STRING(10), 
            allowNull: false, 
        }, 
    },{ 
        tableName: "user"
    });
    usermodel.removeAttribute('id');
    usermodel.removeAttribute('createdAt');
    usermodel.removeAttribute('updatedAt');
    return usermodel
}
