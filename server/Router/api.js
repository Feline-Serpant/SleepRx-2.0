const express =  require('express');
const sleepController = require('../controllers/sleepController')
const loginController = require('../controllers/loginController')
const router = express.Router();

//OAUTH TODO: Make rout post request for /login and one rout post request for
// /register.

//second login gets data from user. Possibly set a session

router.get('/',
    sleepController.getUserData, 
    //returns only userid, firstname, lastname'
    (req, res) => res.status(200).send(res.locals.users)
);
//coral added this route, middleware can be found in controller
router.get('/sleep',
    sleepController.getSleepData,
    
    (req, res) => res.status(200).send(res.locals.allSleepEntries)
);


router.post('/register',
    loginController.createUser,
    (req, res) => res.status(200).json(res.locals.user)
)

router.get('/login',
    loginController.loginUser,
    (req, res) => res.status(200).json(res.locals.user)
)

router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json(res.locals.users)
)

router.delete('/delete',
    sleepController.deleteSleepEntry,
    (req, res) => {
        res.status(200).json(res.locals.deletedEntry)
    }
);

//Coral updated this route
router.post('/',

    sleepController.createSleepEntry,
    (req, res) => {
        res.status(200).json(res.locals.createdSleepEntry)
    }
);
router.patch('/confirm',
    sleepController.confirmSleepEntry,
    (req, res) => {
        res.status(200).json(res.locals.entryExists)
    }
);

router.patch('/update',
    sleepController.updateSleepEntry,
    (req, res) => {
        console.log("in router.patch for /update")
        res.status(200).json()
    }
);

//Coral updated this route
// router.patch('/:userid/:sleepid',
//     sleepController.updateSleepEntry,
//     (req, res) => {
//         console.log(req.query)
//         res.status(200).json(res.locals.updatedSleepEntry)
//     }
// );


module.exports = router;