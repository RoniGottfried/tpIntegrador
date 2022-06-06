module.exports = (sequelize, dataTypes)=>{
    let alias = "Comic";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        title: {
            type: dataTypes.STRING,
        },
        genre_id: {
            type: dataTypes.STRING
        }
    }
   
    let config = {
       tableName: 'comics', // No coincide con el modelo
       timestamps: false
    }
   
    const Movie = sequelize.define(alias, cols, config)
    return Movie;
   
   }