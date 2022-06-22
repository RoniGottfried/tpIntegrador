

module.exports = (sequelize, dataTypes)=>{
    let alias = "comics";
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false,
        },

        name_: {
            type: dataTypes.STRING(50),
        },

        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },

        description: {
            type: dataTypes.STRING(500)
        },

        url_image: {
            type: dataTypes.STRING(250)
        },

        usuario_id: {
            type: dataTypes.INTEGER
        },

        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'comics', // No coincide con el modelo
       timestamps: true,
       underscored: true
    }
   
    const comics = sequelize.define(alias, cols, config)

    comics.associate = function(models){
        comics.belongsTo(models.usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario"
        })
        comics.hasMany(models.comentarios,{
            as: 'comentarios',
            foreignKey: 'id_comic' 
         }) 
    }

    return comics;
   
   }