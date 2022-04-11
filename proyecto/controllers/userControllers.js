const userController = {
    login: function (req, res) {
      return res.render('login');
    },
    register: function (req, res) {
        return res.render('register');
    },
    perfil: function (req, res) {
        return res.render('perfil');
    },
    
  };
  
module.exports = userController;