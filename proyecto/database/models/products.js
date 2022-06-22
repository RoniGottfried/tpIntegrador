

module.exports = (sequelize, dataTypes)=>{
    let alias = "Products";
    let cols = {
        
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false,
        },

        name_product: {
            type: dataTypes.STRING(50),
        },

        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },

        description: {
            type: dataTypes.STRING(500)
        },

        image_product: {
            type: dataTypes.STRING(250)
        },

        id_user: {
            type: dataTypes.INTEGER
        },

        updated_at: {
            type: dataTypes.DATE
        }
    }
   
    let config = {
       tableName: 'products', // No coincide con el modelo
       timestamps: true,
       underscored: true
    }
   
    const Products = sequelize.define(alias, cols, config)

    Products.associate = function(models){
        Products.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_usuario"
        })
        Products.hasMany(models.Comments,{
            as: 'comments',
            foreignKey: 'id_product' 
         }) 
    }

    return Products;
   
   }