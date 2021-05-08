const express =  require('express');
const sleepController = require('../controllers/sleepController')
const router = express.Router();
import loginRoute from '../controllers/auth';
import registerRoute from '../middleware/register';

//OAUTH TODO: Make rout post request for /login and one rout post request for
// /register.

//second login gets data from user. Possibly set a session

router.get('/',
    sleepController.getUserData,
    //returns only userid, firstname, lastname
    (req, res) => res.status(200).send(res.locals.users)
);

<<<<<<< HEAD
=======
router.get('/login')

>>>>>>> dev
router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json({})
);

<<<<<<< HEAD
//first GITHUB request:
app.get('/login/github', loginRoute);
//GITHUB register:
app.get('/register', registerRoute);

router.post('',
=======
router.post('/newentry',
>>>>>>> dev
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