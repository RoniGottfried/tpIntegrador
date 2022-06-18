const db = require("../database/models");

const usuarios = db.usuarios;
const comics = db.comics;
const comentarios = db.comentarios;
const op = db.Sequelize.Op;

const productsController = {

    producto: function (req, res) {
      return res.render('products', {comics: products.lista, comentarios: comentarios.lista})
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    buscarProducto: function (req, res) {
        return res.render('search-results', {comics: products.lista});
    },
    search: function (req, res) {
      const id = req.query.search;
      db.Comics.findAll( {
        where: [
          { titulo: {[op.like]: id}}
        ]
      })
      .then((resultado)=> {
        return res.render('search-results', {comics: resultado})
      })
    },
  }

  module.exports = productsController;