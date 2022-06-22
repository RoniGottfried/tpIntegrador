const bcrypt = require('bcryptjs');
const { response } = require('../app');
const db = require("../database/models");
const Users = db.Usuarios


const userController = {
    register: function (req, res) {
        // if de si estas ya registrado
        if(req.session.usuario !== undefined){
            return res.redirect('/')
        }else{
            return res.render('register');
        }   
    },
    registerProcess: function(req, res) {
        let errors = {}
        // por si no escribe mail
        if(req.body.mail == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors; // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){ // si no pone contrasena
            errors.message = "La contraseña es obligatoria";
            res.locals.errors = errors; // Guardar errors en locals
            return res.render('register')
        }  else if (req.body.password.length < 3) {// requisitos contrasena
            errors.message = "La contraseña debe tener mas de 3 caracteres";
            return res.render('register')  
        }  else if(req.body.retypePassword == ""){
            errors.message = "La contraseña es obligatoria";
            res.locals.errors = errors; // Guardar errors en locals
            return res.render('register')
        }else if(req.password != req.retypePassword){
            errors.message = "Las contraseñas no coinciden";
            res.locals.errors = errors; // Guardar errors en locals
            return res.render('register')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "El archivo debe ser jpg o png";
            res.locals.errors = errors; // Guardar errors en locals
            return res.render('register') 
        }else {
            Users.findOne({
                where: {mail: req.body.mail}
            })
            .then(function(usuarios){
                if(usuarios != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    res.locals.errors = errors; // Guardar errors en locals
                    return res.render('register')                
                }else {
                    let usuario = {
                        nombre: req.body.nombre,
                        mail: req.body.mail,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: 'req.file.filename'
                    }
                    users.create(usuario)
                        .then(usuarios => {
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
        Users.findOne({
            //se busca un mail (= al nombre del atributo) en la base de datos que 
            //sea igual al mail que se pone en el input (email)
            where: [{mail: req.body.email}]
        })
        // .then porque en sequalize son todos metodos asincronicos
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
        } else {
            req.session.usuarios = usuarios;
        }
        })
        .catch(error => console.log(error))
    },
    logout: function(req, res){
        req.session.destroy();

        res.clearCookie("userId");
        
        res.redirect("/")
    },
    perfil: function (req,res) {
        const id = req.params.id
        db.Usuarios.findByPk(id,{
            include:[
                {
                    association: 'comentarios',
                    include: {
                        association: 'usuarios'
                    }
                },
                {
                    association: 'comics',
                    include: {
                        association: "comentarios"
                    }
                },
            ]
        })
        .then( (data) => {
            if (data == null) {
                return res.redirect('/')
            } else {
                return res.render('perfil', { data:data })
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    },
    perfilEdit: function (req,res) {
        let id = req.params.id

        if (req.session.usarios) {
            if (id != req.session.usuarios.uduario_id) {
                return res.redirect(`/usuarios/perfil-edit/${req.session.usuarios.usuario_id}`)
            } else {
                usuarios.findByPk(id, {
                        include: [
                            //relación comentario producto.
                            {
                                association: 'comentarios'
                            },
                            // relación producto usuario                                
                            {
                                association: 'comics'
                            }
                        ]
                    })
                    .then(data => {
                        if (data == null) {
                            return res.redirect('/')
                        } else {
                            return res.render('perfil-edit', { data: data })
                        }
                    }) 
                    .catch(error => {
                        console.log(error)
                    })
            } 
        } else {
            return res.redirect('/usuarios/login')
        }
    },
    perfilStore: function(req,res){
        const usuarios = {
            nombre: req.body.name,
            mail: req.body.mail,
            password: bcrypt.hashSync(req.body.password, 12),
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            documento: req.body.documento,
            avatar: "",
        }

        if (req.file == undefined) {
            usuarios.avatar = req.session.usuarios.avatar;
        } else {
            usuarios.avatar = req.file.filename;
        }

        db.Usuarios.update(user, {
                where: {
                    id: req.session.usuarios.id
                }
            })
            .then(function(){

                usuarios.id = req.session.usuarios.id

                req.session.usuarios = usuarios /* Probar sin esto o usando abajo el req.session.usser.id */

                return res.redirect( `/usuarios/perfil/${usuarios.id}` )
            })
            .catch(error => {
                console.log(error)
            }) 
    }
    
  };
  
module.exports = userController;