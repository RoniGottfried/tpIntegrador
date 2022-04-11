let usuario = require('../db/usuarios.js')

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
    perfilEdit: function (req, res) {
      return res.render('perfil-edit', {usuario});
  },
    
  };
  
module.exports = userController;