module.exports = (sequelize, dataTypes)=>{
    let alias = "comentarios";
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

    comentarios.associate = function (models){
        comentarios.belongsTo(models.comics,{
            as: 'comics',
            foreignKey: 'id_comic'
        }) 
        comentarios.belongsTo(models.usuarios,{
            as:'usuarios',
            foreignKey: 'id_usuario'
        }) 
    }

    return comentarios;
    
   
   }