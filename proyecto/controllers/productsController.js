const productsController = {
    index: function (req, res) {
      //let lista = ["Heroe1","Heroe2","Heroe3","Heroe4","Heroe5"]
      return res.render('products')
    },
    
  };
  
  module.exports = productsController;