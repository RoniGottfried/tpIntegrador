const db = require('../database/models');

const comentariosController = {
    index: function (req, res) {
      return res.render('comentarios', {comentarios: comentarios})
    },
    
  };
  
  module.exports = comentariosController;