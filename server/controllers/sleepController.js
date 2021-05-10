const db = require('../models/sleepModels');

const sleepControllers = {
  //GET REQUEST for user information on their sleep profile/data
  getUserData: async (req, res, next) =>{
    try {
      //returned data
      //need to make this query only select user based on parameter passed from fetch request
      const result = await db.query('SELECT userid, first_name, last_name FROM user_data')
      //figure out how to manipulate res from db
      res.locals.users = result.rows; 
      return next();

    }catch (err){
      console.log(err);
      return next(err);
    }
  },

  //GET REQUEST for user information on their sleep profile/data
   //coral added this middleware for testing
  getSleepData: async (req, res, next) =>{
    try {
      //returned data
      //need to make this query only select user based on parameter passed from fetch request
      const result = await db.query('SELECT * FROM sleep')
      //figure out how to manipulate res from db
      res.locals.allSleepEntries = result.rows; 
      return next();

    }catch (err){
      console.log(err);
      return next(err);
    }
  },


  //POST REQUEST to create new DB entries of sleep data per user
 //coral updated this middleware
  createSleepEntry: async (req, res, next) => {
    try{
      const { userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date} = req.body;
      //const userid = req.params
      const query = "INSERT INTO sleep (userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
      const values = [userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date]

      const result = await db.query(query, values);
      res.locals.createdSleepEntry = result.rows[0]

      console.log(result);
      
      return next();
    } catch (err){
      console.log(err)
    }
    
  },

  //PATCH REQUEST to update current sleep data before it 
  //coral updated this middleware
  updateSleepEntry: async (req, res, next) =>{
    try {
      const {userid, sleepid} = req.params;
      const {bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date} = req.body;
      const query = "UPDATE sleep SET bed_time = ($1), wake_time = ($2), hours_slept = ($3), exercise_time = ($4), caffeine_intake = ($5), calorie_intake = ($6), mood = ($7), score = ($8), date = ($9) WHERE userid = ($10) AND sleepid = ($11) returning *"
      const value = [bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date, userid, sleepid]

      const result = await db.query(query, value)
      console.log(result)
      res.locals.updatedSleepEntry = result.rows[0]
      
      return next();
    }catch(err){
      console.log(err)
    }
  },

  //DELETE REQUEST to delete entry

  //coral updated this middleware
  deleteSleepEntry: async (req, res, next) => {
    try{
      const {sleepid} = req.body
      const value = [sleepid]
      const result = db.query('DELETE FROM sleep WHERE sleepid=($1) returning *', value)
      res.locals.deletedSleepEntry = result.rows[0]
      console.log(`Deleted Sleep Entry ${sleepid} from DB,`, result)
      return next();
    }catch(err){
      console.log(err)
    }
  }
};

module.exports = sleepControllers;