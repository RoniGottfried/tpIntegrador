const db = require('../database/models');


const mainController = {
    index: function (req, res) {
      db.Products.findAll()
        .then (data =>{
          return res.render('index', {products: data})
        }) 
        .catch (error =>{
          console.log(error)
        })
    },
    
  };
  
  module.exports = mainController;