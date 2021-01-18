const allowUrl = ['login'];


const authenticationMiddleware = (req, res, next) => {
    if(req.url == '/login' || req.url.slice(1,6) == 'reset' ||
        req.url =='/forgot-password' || (req.user && req.user.status == "ACTIVE")) {
       return next();
    } 

    
    res.redirect('/login');
}

module.exports = authenticationMiddleware;