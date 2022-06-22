const db = require("../database/models");

const op = db.Sequelize.Op;
const Comics = db.Comics;
const comentarios = db.Comentarios;

const productsController = {

    producto: function (req, res) {
      return res.render('products', {Comics: Comics, comentarios: comentarios})
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    detail: function(req, res){
        const id = req.params.id;
        
        Comics.findByPk(id, {
            include: [  //relación comentario producto.
                { association: 'comentarios',
                    include: { association: 'usuarios' },
                },                           
                { association: 'usuarios' }
            ],
            order: [['comentarios', 'createdAt', 'DESC']]
        })
            .then(data => {
                //Si no hay producto que coincida con el id, redirecciona a home.
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('products', { data: data })
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    search: (req, res) => {
      const buscarProductos = req.query.search; // Obtengo la info de la querystring.
      const errors = {}
      if(buscarProductos == "" || buscarProductos == undefined){
      errors.message = "Este campo no puede estar vacío";
      res.locals.errors = errors;
      return res.render('search-results', {resultado: errors})
  } else {
          Comics.findAll({
              where: {
                  [op.or]:[
                      {name_: {[op.like]: "%" + buscarProductos + "%", }},
                      {description: {[op.like]: "%" + buscarProductos + "%", }},
                      {usuario_id: {[op.like]: "%" + buscarProductos + "%", }},
                  
                  ]
                  },
              order: [
                  ['name_', 'ASC']
              ],
          })
              .then(resultado => {
                  
                  if(resultado == ""){
                      errors.message = "No hay resultados para su búsqueda";
                      res.locals.errors = errors;
                      return res.render('search-results', {resultado: errors})
                  } else{
                      return res.render('search-results', {resultado: resultado})
                  }
              })
              .catch(error => {
                  console.log(error)
              })
      }}, 
  }

  module.exports = productsController;