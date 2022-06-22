module.exports = (sequelize, dataTypes)=>{
    let alias = "Comentarios";
    let cols = {
        
        id_comentario: {
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
   
    const Comentarios = sequelize.define(alias, cols, config)

    Comentarios.associate = function (models){
        Comentarios.belongsTo(models.Comics,{
            as: 'comics',
            foreignKey: 'comic_id'
        }) 
        Comentarios.belongsTo(models.Usuarios,{
            as:'usuarios',
            foreignKey: 'usuario_id'
        }) 
    }

    return Comentarios;
    
   
   }