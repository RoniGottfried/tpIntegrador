const userController = {
    login: function (req, res) {
      return res.render('login');
    },
    register: function (req, res) {
        return res.render('perfil', {
          autor: "Lucas, Feli y Roni"
        });
    },
    perfil: function (req, res) {
        return res.render('perfil', {
          autor: "Lucas, Feli y Roni"
        });
    },
    
  };
  
module.exports = userController;