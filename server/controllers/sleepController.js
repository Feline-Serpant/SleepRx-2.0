const db = require('../models/sleepModels');

const removeSpecialChars = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '')
}
const convertNumber = (object) => {
  for(const key in object){
    if(key === "wake_time" || key === "bed_time"){
      object[key] = removeSpecialChars(object[key])
    }
    if(key != "date") object[key] = Number(object[key])
  }
  return object;
}

const calcScore = (object) =>{
  console.log(object)
  const {hours_slept, exercise_time, caffeine_intake, calorie_intake, mood} = object;
  // console.log("in calc score", object)
  // console.log(exerciseScore(hours_slept))
  const evalScore = sleepScore(hours_slept) + exerciseScore(exercise_time) + caffeineScore(caffeine_intake) + calorieScore(calorie_intake) + moodScore(mood);
  // console.log(evalScore)
  return evalScore; 
}

const sleepScore = (num) =>{
  if(num<2) return -2
  if(num<3) return -1;
  if(num<4) return 1;
  if(num<5) return 2;
  if(num<7) return 3;
  if(num>9) return 3;
  else return 4;
}
//=ifs(E3<0.25, 0, E3<0.5, 0.5, E3<1, 1, E3>=1, 2)
const exerciseScore = (num) =>{
  if(num<0.25) return 0;
  if(num<0.5) return 0.5;
  if(num<1) return 1;
  else return 2;
}
//=IFS(G3= 0, 1, G3>0, 1- G3*(0.25))
const caffeineScore = (num) =>{
  if(num===0) return 1;
  if(num>0) return 1-(num * 0.25);
}

const calorieScore = (num) => {
  if(num===2000) return 1;
  if(num<1250) return 0.5
  if(num<1000) return 0
}

const moodScore = (num) => {
  if(num===3) return 2;
  if(num===2) return 1.3;
  if(num===1) return 0.6;
}

const sleepControllers = {
  //GET REQUEST for user information on their sleep profile/data
  getUserData: async (req, res, next) =>{
    try {
      console.log(res.locals.curUser);
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
      console.log(req.user);
      //need to make this query only select user based on parameter passed from fetch request
      const result = await db.query('SELECT * FROM sleep where userid = ($1)', [req.user])
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
      // console.log("from create sleep entry,",  req.body.values)
      //console.log(req.body.values)
      
      req.body = convertNumber(req.body)
      const {bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date} = req.body;
      const newScore = Math.floor(calcScore(req.body))
      console.log(req.user, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, newScore , date)
      const query = "INSERT INTO sleep (userid, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
      const values = [req.user, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, newScore , date]
      const result = await db.query(query, values);
      console.log(result.rows[0])
      res.locals.createdSleepEntry = result.rows[0]
      console.log(res.locals.createdSleepEntry)

      // console.log(result);

      return next();
    } catch (err){
      console.log(err)
    }
    
  },

  confirmSleepEntry: async (req,res,next) => {
    try{
      //console.log("in controller for confirm sleepentry")
      //console.log(req.body.date)
      const result = await db.query("SELECT * FROM sleep WHERE date = ($1)", [req.body.date])
      if(result.rowCount === 0) res.locals.entryExists = false;
      else res.locals.entryExists = true;
      console.log(res.locals)
      return next();
    }catch(err){
      console.log(err)
    }
  },

  //PATCH REQUEST to update current sleep data before it 
  //coral updated this middleware
  updateSleepEntry: async (req, res, next) =>{
    try {
      req.body.values = convertNumber(req.body.values)
      const {userid, sleepid} = req.params;
      const newScore = Math.floor(calcScore(req.body.values))
      const {bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, score, date} = req.body.values;
      const query = "UPDATE sleep SET bed_time = ($1), wake_time = ($2), hours_slept = ($3), exercise_time = ($4), caffeine_intake = ($5), calorie_intake = ($6), mood = ($7), score = ($8) WHERE date = ($9) RETURNING*"
      const value = [bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood, newScore, date]

      const result = await db.query(query, value)
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
      console.log(req.body)
      const {sleepid} = req.body
      const value = [sleepid]
      const result = await db.query('DELETE FROM sleep WHERE sleepid=($1)', value)
      res.locals.deletedEntry = result
      console.log(`Deleted Sleep Entry ${sleepid} from DB,`, result)
      return next();
    }catch(err){
      console.log(err)
    }
  }
};

module.exports = sleepControllers