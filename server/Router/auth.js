const express = require('express')
const router = express.Router();
const loginController = require('../controllers/loginController')
const autorizationController = require('../controllers/authorizationController');



router.post('/register',
    loginController.createUser,
    (req, res) => res.status(200).json({'token': res.locals.token})
)

router.post('/login',
    loginController.loginUser,
    (req, res) => res.status(200).json({'token': res.locals.token})
)

router.get('/is-verify',
autorizationController.authorize, 
(req,res)=>{
    res.json(true);
    }
)

module.exports = router;