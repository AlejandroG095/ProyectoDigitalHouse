module.exports = function(sequelize, DataTypes){
    let alias = "User";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        avatar:{
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}