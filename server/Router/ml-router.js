const express =  require('express');
const router = express.Router();
const db = require('../models/sleepModels');

const generator = require('./../helper_functions/fake_data_gen');


router.get('/', (req, res) => {

    const {bed_time, hours_slept, exercise_time, caffeine_intake, calorie_intake} = req.query;
    // console.log(req.query);
    const fakeDataArr = [];
    for (let i = 0; i < 100; i++) {

        fakeDataArr.push(generator(Number(bed_time), Number(hours_slept), Number(exercise_time), Number(caffeine_intake), Number(calorie_intake), i));
        // const query =
        //     `INSERT INTO sleep (userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, score, date)
        //     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        // const params = [74, fakeData.bedTime, fakeData.wakeTime, fakeData.sleepLength, fakeData.exerciseTime, fakeData.caffeineBeforeSleep, fakeData.calories, fakeData.score, fakeData.date ];
    
        // db.query(query, params)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
    }
    

    res.json(fakeDataArr);
});

module.exports = router;