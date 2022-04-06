const perfilController = {
    index: function (req, res) {
      //let lista = ["Heroe1","Heroe2","Heroe3","Heroe4","Heroe5"]
      return res.render('perfil', {
        autor: "Lucas, Feli y Roni"
      });
    },
    
  };
  
  module.exports = perfilController;