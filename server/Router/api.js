const express =  require('express');
const sleepController = require('../controllers/sleepController')
const router = express.Router();
const loginRoute = require('../controllers/authController');
const registerRoute = require('../middleware/register');

//OAUTH TODO: Make rout post request for /login and one rout post request for
// /register.

//second login gets data from user. Possibly set a session

router.get('/',
    sleepController.getUserData,
    //returns only userid, firstname, lastname
    (req, res) => res.status(200).send(res.locals.users)
);

// //first GITHUB request:
// app.use('/login/github', loginRoute);
// //GITHUB register:
// app.use('/register', registerRoute);

router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json({})
);

router.post('/newentry',
    sleepController.createSleepEntry,
    (req, res) => {
        res.status(200).send('from router post')
    }
);


router.patch('',
    sleepController.updateSleepEntry,
    (req, res) => res.status(200).json({})
);

router.delete('',
    sleepController.deleteSleepEntry,
    (res, req) => res.status(200).json({})
);

module.exports = router;