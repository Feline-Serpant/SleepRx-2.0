const express =  require('express');
const sleepController = require('../controllers/sleepController')
const router = express.Router();

router.get('/',
    sleepController.getUserData,
    (req, res) => res.status(200).send('IT WORKS!!')
);



router.get('/users',
    sleepController.getUserData,
    (req, res) => res.status(200).json({})
);

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