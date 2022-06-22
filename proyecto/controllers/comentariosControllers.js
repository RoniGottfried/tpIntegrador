const db = require('../database/models');
const Op = db.Sequelize.Op;
const comment = db.Comments;


const comentariosController = {

  index: function (req, res) {
    return res.render('comentarios', {comentarios: comentarios})
  },
    
  comment: function(req, res){
    if(req.session.user){
        const comment = {
            id_user: req.session.user.id_user,
            id_product: req.params.id,
            comment: req.body.comment,
        }     
        comment.create(comment)
        return res.redirect(`/products/product/${req.params.id}`)
    }else{
        return res.redirect("/users/login")
        }
  },
  
  
  deleteComment: function(req, res){
        comment.findByPk(req.params.id)
        .then(data => {
            comment.destroy({
                where: [
                    {
                        id_comment: req.params.id
                    }
                ]
            })
            .then(() =>{
                return res.redirect(`/products/product/${data.id_product}`)
            })
            .catch(error => {
                console.log(error)
            })
        })     
    },
  
  
  
  
  
  
  
  
  };
  
  module.exports = comentariosController;