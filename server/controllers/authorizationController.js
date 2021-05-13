const jwt = require('jsonwebtoken');
require('dotenv').config();
//check if the token is valid 

const autorizationController = {
    async authorize(req, res, next){
        const jwtToken = req.header("token");
        if (!jwtToken ) {
            return res.status(403).json({ msg: "authorization denied" });
          }
          
        try{
            const verify = jwt.verify(jwtToken, process.env.jwtSecret);
            req.user = verify.user;
            next();

        }catch(err){
            console.error(err.message);
            return res.status(403).json({error: "NOT AUTHORIZE"});
        }
    }

}

module.exports = autorizationController;