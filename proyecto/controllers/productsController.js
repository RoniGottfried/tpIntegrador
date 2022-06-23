const db = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const product = db.Products;
const comment = db.Comments;
const user = db.Users;

const productsController = {

    producto: function (req, res) {
      return res.render('products', {Comics: Comics, comentarios: comentarios})
    },
    
    add: function (req, res) {
        return res.render('product-add');
    },

    productProcess: function(req, res){
        const errors = {}
        if(req.body.name_product == ""){
            errors.message = "El nombre del producto es obligatorio",
            res.locals.errors = errors;
            return res.render('products-add')
        } else if (req.file == undefined){
            errors.message = "La foto del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('products-add')
        }else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            res.locals.errors = errors;
            return res.render('products-add')
        } else if (req.body.description == ""){
            errors.message = "La descripción del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('products-add')
        } else {
            let producto = {
                name_product: req.body.name_product,
                description: req.body.description,
                image_product: req.file.filename,
                id_user: req.session.user.id_user,
            }
            Producto.create(producto)
            return res.redirect("/")
                
             }
    }, 

    detail: function(req, res){
        const id = req.params.id;
        
        product.findByPk(id, {
            include: [  //relación comentario producto.
                { association: 'Comments',
                    include: { association: 'users' },
                },                           
                { association: 'Users' }
            ],
            order: [['comments', 'createdAt', 'DESC']]
        })
            .then(data => {
                //Si no hay producto que coincida con el id, redirecciona a home.
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('products', {data: data});
                }
            })
            .catch(error => {
                console.log(error)
            })
    },

    search: function(req, res) {
      const searchProduct = req.query.search; // Obtengo la info de la querystring.
      const errors = {}
      if(searchProduct == "" ){
      errors.message = "Este campo no puede estar vacío";
      res.locals.errors = errors;
      return res.render('search-results');
        } else {
          product.findAll({
              where: {
                  [op.or]:[
                      {name_product: {[Op.like]: "%" + searchProduct + "%", }},
                      {description: {[Op.like]: "%" + searchProduct + "%", }},
                      {id_user: {[Op.like]: "%" + searchProduct + "%", }},
                  
                  ]
                  },
              order: [
                  ['name_product', 'ASC']
              ],
              include: [  //relación comentario producto.
              { association: 'comments'},                           
              { association: 'users' }
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
    
    productEdit: function(req, res) {
        const id = req.params.id;
        if(req.session.user){
            product.findByPk(id)
                .then(data=>{
                    if(req.session.user.id_user == data.id_user){
                        return res.render("product-edit", {data: data}); 
                    }else{
                        return res.redirect("/")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }else{
            return res.redirect("/users/login")
        }
    },
  }

  module.exports = productsController;