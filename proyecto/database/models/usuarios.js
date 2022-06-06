module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        }, name: {
            type: dataTypes.STRING,
            field: "nombre"
        }, password: {
            type: dataTypes.STRING,
            field: "contrasena"
        },
        email:{
            type: dataTypes.STRING,
            field: "email"
        },
    }, {
        tableName: "users",
        timestamps: false
    });
    return User;
}