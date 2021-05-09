const express =  require('express');
const sleepController = require('../controllers/sleepController')
const loginController = require('../controllers/loginController')
const router = express.Router();

//OAUTH TODO: Make rout post request for /login and one rout post request for
// /register.

//second login gets data from user. Possibly set a session

router.get('/',
    sleepController.getUserData, 
    //returns only userid, firstname, lastname
    (req, res) => res.status(200).send(res.locals.users )
);
//coral added this route, middleware can be found in controller
router.get('/sleep',
    sleepController.getSleepData,
    
    (req, res) => res.status(200).send(res.locals.allSleepEntries)
);


router.post('/register',
    loginController.createUser,
    (req, res) => res.status(200).send("from reguser route")
)

router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json({})
)


router.post('/',

    sleepController.createSleepEntry,
    (req, res) => {
        res.status(200).send('from router post')
    }
);


router.patch('/:userid/:sleepid',
    sleepController.updateSleepEntry,
    (req, res) => {
        console.log(req.query)
        res.status(200).send("from patch route")
    }
);

router.delete('/:id',

    sleepController.deleteSleepEntry,
    (res, req) => res.status(200).json({})
);

module.exports = router;