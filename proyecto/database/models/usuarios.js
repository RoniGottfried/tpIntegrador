module.exports = (sequelize, dataTypes) => {

    let alias = "usuarios";
    let cols = {
    
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }, 
        
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false,
        }, 

        apellido: {
            type: dataTypes.STRING(50),
        },

        documento: {
            type: dataTypes.INTEGER(10),
        },

        fecha_de_nacimiento: {
            type: dataTypes.DATE,
        },
        
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },

        mail: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },

        avatar: {
            type: dataTypes.STRING(200)
        },

        created_at: {
            type: dataTypes.DATE,
        },

        updated_at: {
            type: dataTypes.DATE,
        }
    } 
    
    let config = {
        tableName: "usuarios",
        timestamps: true,
        underscored: true
    };

    const usuarios = sequelize.define(alias, cols, config)

    return usuarios;
}