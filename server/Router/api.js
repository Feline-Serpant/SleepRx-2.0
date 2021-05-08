const express =  require('express');
const sleepController = require('../controllers/sleepController')
const router = express.Router();

router.get('/',
    sleepController.getUserData,
    //returns only userid, firstname, lastname
    (req, res) => res.status(200).send(res.locals.users)
);

router.get('/login')

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