const bcrypt = require('bcryptjs')
const db = require("../database/models");
const usuarios = db.usuarios

/* let usuarios = require('../db/users.js') */
let products = require('../db/products')
let comentarios = require('../db/usuarios')

const userController = {
    register: function (req, res) {
        return res.render('register');
    },
    registerAct: function(req, res) {
        let errors = {}
        if(req.body.mail == ""){
            errors.message = "El email es obligatorio";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contraseña es obligatoria";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.body.password.length < 3) {
            errors.message = "La contraseña debe tener mas de 3 caracteres";
            return res.render('register')  
        } else if(req.body.retypePassword == ""){
            errors.message = "La contraseña es obligatoria";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        }else if(req.password != req.retypePassword){
            errors.message = "Las contraseñas no coinciden";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        }else {
            usuarios.findOne({
                where: [{mail: req.body.mail}]
            })
            .then(function(usuario){
                if(usuario != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    console.log(errors) // Guardar errors en locals
                    return res.render('register')                
                }else {
                    let usuario = {
                        nombre: req.body.name,
                        mail: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: req.file.filename
                    }
                    usuarios.create(usuario)
                        .then(usuario => {
                            return res.redirect('/')
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                }
            }
            )
        }
    },
    login: function (req, res) {
        return res.render('login');
    },
    loginProcess: function(req, res){
        //hacemos que se busque el usuario que se quiere loguear en la tabla (lo que debe estar ahi es el alias de la db)
        usuarios.findOne({
            //se busca un mail (= al nombre del atributo) en la base de datos que 
            //sea igual al mail que se pone en el input (email)
            where: [{mail: req.body.email}]
        })
        .then( usuarios => {
        let errors = {};
        if(usuarios == null){
            //cargo el mensaje del error
            errors.message = 'El email no existe'
            //pasar el mensaje a la vista
            res.locals.errors = errors
            //renderizar la vista
            return res.render('login')
        } else if(bcrypt.compareSync(req.body.password, usuarios.password) == false){
            errors.message = "La contraseña es incorrecta"
            res.locals.errors = errors
            return res.render('login');
        }
        })
    },
    perfil: function (req, res) {
        return res.render('perfil', {usuario: usuarios, comics: products.lista, comentarios: comentarios.lista});
    },
    perfilEdit: function (req, res) {
      return res.render('perfil-edit', {usuario: usuarios});
  },
    
  };
  
module.exports = userController;