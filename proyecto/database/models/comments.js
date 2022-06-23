module.exports = (sequelize, dataTypes)=>{
    let alias = "Comments";
    let cols = {
        
        id_comment: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false,
        },

        comment: {
            type: dataTypes.STRING(500),
        },

        id_user: {
            type: dataTypes.INTEGER
        },

        id_product: {
            type: dataTypes.INTEGER
        },

    }
   
    let config = {
       tableName: 'comments', // No coincide con el modelo
       timestamps: false
    }
   
    const Comments = sequelize.define(alias, cols, config)

    Comments.associate = function (models){
        Comments.belongsTo(models.Products,{
            as: 'products',
            foreignKey: 'id_product'
        }) 
        Comments.belongsTo(models.Users,{
            as:'users',
            foreignKey: 'id_user'
        }) 
    }

    return Comments;
    
   
   }