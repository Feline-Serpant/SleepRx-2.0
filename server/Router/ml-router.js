const express =  require('express');
const router = express.Router();
const db = require('../models/sleepModels');

const generator = require('./../helper_functions/fake_data_gen');


router.get('/', (req, res) => {

    for (let i = 0; i < 20; i++) {

        const fakeData = generator(2300, 7, 45, 5, 2000, i);
        const query =
            `INSERT INTO sleep (userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, score, date)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        const params = [74, fakeData.bedTime, fakeData.wakeTime, fakeData.sleepLength, fakeData.exerciseTime, fakeData.caffeineBeforeSleep, fakeData.calories, fakeData.score, fakeData.date ];
    
        db.query(query, params)
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
    

    res.send('sent');
});

module.exports = router;