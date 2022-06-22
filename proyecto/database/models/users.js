module.exports = (sequelize, dataTypes) => {

    let alias = "Users";
    let cols = {
    
        id_user: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }, 
        
        user: {
            type: dataTypes.STRING(50),
            allowNull: false,
        }, 

        fecha_nacimiento: {
            type: dataTypes.DATE,
        },
        
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },

        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },

        image_profile: {
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
        tableName: "users",
        timestamps: true,
        underscored: true,
    };

    const Users = sequelize.define(alias, cols, config)

    Users.associate = function(models){
        Users.hasMany(models.Comics, {
            as: "products",
            foreignKey: "id_user"
        })
        Users.hasMany(models.Comentarios, {
            as: "comments",
            foreignKey: "id_user"
        })
    }

    return Users;
}