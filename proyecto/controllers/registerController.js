const registerController = {
    index: function (req, res) {
      //let lista = ["Heroe1","Heroe2","Heroe3","Heroe4","Heroe5"]
      return res.render('index', {
        titulo: "Bienvenidos a Digital Science",
        autor: "Bruno Dias"
      });
    },
    
  };
  
  module.exports = registerController;