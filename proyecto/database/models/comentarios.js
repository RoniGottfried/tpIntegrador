module.exports = (sequelize, dataTypes)=>{
    let alias = "Comentarios";
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false,
        },

        text_: {
            type: dataTypes.STRING(500),
        },

        created_at: {
            type: dataTypes.DATE
        },

        usuario_id: {
            type: dataTypes.INTEGER
        },

        comic_id: {
            type: dataTypes.INTEGER
        },

        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'comentarios', // No coincide con el modelo
       timestamps: true
    }
   
    const comentarios = sequelize.define(alias, cols, config)

    return comentarios;
   
   }