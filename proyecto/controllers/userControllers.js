let usuarios = require('../db/usuarios.js')
let products = require('../db/products')
let comentarios = require('../db/usuarios')

const userController = {
    login: function (req, res) {
      return res.render('login');
    },
    register: function (req, res) {
        return res.render('register');
    },
    perfil: function (req, res) {
        return res.render('perfil', {usuario: usuarios, comics: products.lista, comentarios: comentarios.lista});
    },
    perfilEdit: function (req, res) {
      return res.render('perfil-edit', {usuario: usuarios});
  },
    
  };
  
module.exports = userController;