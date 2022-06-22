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

        created_at: {
            type: dataTypes.DATE
        },

        id_users: {
            type: dataTypes.INTEGER
        },

        id_producto: {
            type: dataTypes.INTEGER
        },

        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'comments', // No coincide con el modelo
       timestamps: true
    }
   
    const Comments = sequelize.define(alias, cols, config)

    Comments.associate = function (models){
        Comments.belongsTo(models.Products,{
            as: 'products',
            foreignKey: 'id_product'
        }) 
        Comments.belongsTo(models.Users,{
            as:'usuarios',
            foreignKey: 'id_user'
        }) 
    }

    return Comments;
    
   
   }