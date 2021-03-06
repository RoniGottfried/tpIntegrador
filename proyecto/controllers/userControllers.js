const bcrypt = require('bcryptjs');

const db = require("../database/models");
const Users = db.Users


const userController = {
    register: function (req, res) {
        // if de si estas ya registrado
        if(req.session.user !== undefined){
            return res.redirect('/')
        }else{
            return res.render('register');
        }   
    },
    registerProcess: function(req, res) {
        let errors = {}
        // por si no escribe mail
        if(req.body.email == ""){
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
        } else if(req.body.user == "") {
                errors.message = "El nombre de usuario es obligatorio"
                res.locals.errors = errors;
                console.log(errors) // Guardar errors en locals
                return res.render('register')    
        }else {
            Users.findOne({
                where: {email: req.body.email}
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    res.locals.errors = errors; // Guardar errors en locals
                    return res.render('register')                
                }else {
                    let usuario = {
                        user: req.body.user,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        fecha_nacimiento: req.body.fecha_nacimiento,
                        image_profile: req.file.filename
                    }
                    Users.create(usuario)
                        .then(user => {
                            return res.redirect('/')
                        })
                        .catch(error=>{
                            console.log(error)
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
            where: [{email: req.body.email}]
        })
        // .then porque en sequalize son todos metodos asincronicos
        .then( user => {
        let errors = {};
        if(user == null){
            //cargo el mensaje del error
            errors.message = 'El email no existe'
            //pasar el mensaje a la vista
            res.locals.errors = errors
            //renderizar la vista
            return res.render('login')
        } else if(bcrypt.compareSync(req.body.password, user.password) == false){
            errors.message = "La contraseña es incorrecta"
            res.locals.errors = errors
            return res.render('login');
        } else {
            req.session.user= user;

            //Si tildó recordame => creamos la cookie.
        if(req.body.recordatorio != undefined){
                res.cookie('userCookie', user.id_user, { maxAge: 1000 * 60 * 5})
            }
            return res.redirect('/');
        }
        })
        .catch(error => console.log(error))
    },
    logout: function(req, res){
        req.session.destroy();

        res.clearCookie("userCookie");
        
        res.redirect("/")
    },
    perfil: function (req,res) {
        const id = req.params.id
        Users.findByPk(id,{
            include:[
                {
                    association: 'comments',
                    include: {
                        association: 'users'
                    }
                },
                {
                    association: 'products',
                    include: {
                        association: "comments"
                    }
                },
            ]
        })
        .then( (data) => {
            if (data == null) {
                return res.redirect('/')
            } else {
                return res.render('perfil', { data: data })
            }
        })
        .catch((error)=>{
            console.log(error)
        })

    },
    perfilEdit: function (req,res) {
        let id = req.params.id

        if (req.session.users) {
            if (id != req.session.user.id_user) {
                return res.redirect(`/users/perfil-edit/${req.session.users.id_user}`)
            } else {
                Users.findByPk(id, {
                        include: [
                            //relación comentario producto.
                            {
                                association: 'comments'
                            },
                            // relación producto usuario                                
                            {
                                association: 'products'
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
            return res.redirect('/users/login')
        }
    },
    perfilStore: function(req,res){
        const user = {
            user: req.body.user,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            fecha_nacimiento: req.body.fecha_nacimiento,
            image_profile: ""
        }

        if (req.file == undefined) {
            user.image_profile = req.session.user.image_profile;
        } else {
            user.image_profile = req.file.filename;
        }

        users.update(user, {
                where: {
                    id_user: req.session.user.id_user
                }
            })
            .then(function(){

                id_user = req.session.user.id_user

                req.session.user = user /* Probar sin esto o usando abajo el req.session.usser.id */

                return res.redirect( `/user/perfil/${user.id_user}` )
            })
            .catch(error => {
                console.log(error)
            }) 
    }
    
  };
  
module.exports = userController;