function isAdminMiddleware(req, res, next){
    if(req.session.userLogged.userType != 1){
       res.redirect('/users/profile')
    } 
    next();   
}
module.exports = isAdminMiddleware;