const express =  require('express');
const sleepController = require('../controllers/sleepController')
const loginController = require('../controllers/loginController')
const router = express.Router();

router.get('/',
    sleepController.getUserData,
    //returns only userid, firstname, lastname
    (req, res) => res.status(200).send(res.locals.users)
);

router.post('/reguser',
    loginController.createUser,
    (req, res) => res.status(200).send("from reguser route")
);

router.post('/newentry',
    sleepController.createSleepEntry,
    (req, res) => {
        res.status(200).send('from router post')
    }
);


router.patch('/updateentry/:userid/:sleepid',
    sleepController.updateSleepEntry,
    (req, res) => {
        console.log(req.query)
        res.status(200).send("from patch route")
    }
);

router.delete('',

    sleepController.deleteSleepEntry,
    (res, req) => res.status(200).json({})
);

module.exports = router;