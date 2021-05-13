const jwt = require('jsonwebtoken');
require('dotenv').config();
//check if the token is valid 

const autorizationController = {
    async authorize(req, res, next){
        // console.log('auto cookies are', req.cookies);
        // console.log('auto cookies are',JSON.parse(req.cookies.jwt).token);
        const jwtToken = req.cookies.jwt;
        if (!jwtToken ) {
            res.locals.curUser = undefined;
            req.user = undefined;
            next();
            // return res.json({isLoggedIn: false});
          }
          
        try{
            const verify = jwt.verify(JSON.parse(jwtToken).token, process.env.jwtSecret);
            req.user = verify.user;
            res.locals.user = req.user;
            next();

        }catch(err){
            res.locals.curUser = undefined;
            req.user = undefined;
            next();
            // console.error(err.message);
            // return res.status(403).json({error: `${err}`});
        }
    }

}

module.exports = autorizationController;