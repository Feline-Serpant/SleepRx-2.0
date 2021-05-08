const express =  require('express');
const sleepController = require('../controllers/sleepController')
const router = express.Router();
import loginRoute from '../controllers/auth';
import registerRoute from '../controllers/register';

//OAUTH TODO: Make rout post request for /login and one rout post request for
// /register.

//second login gets data from user. Possibly set a session

router.get('/',
    sleepController.getUserData,
    (req, res) => res.status(200).send(res.locals.users)
);

router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json({})
);

//first GITHUB request:
app.get('/login/github', loginRoute);
//GITHUB register:
app.get('/register', registerRoute);

router.post('',
    sleepController.createSleepEntry,
    (req, res) => res.status(200).json({})
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