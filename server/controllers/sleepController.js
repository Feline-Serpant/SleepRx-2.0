const db = require('../models/sleepModels');

const sleepControllers = {
  //GET REQUEST for user information on their sleep profile/data
  getUserData: async (req, res, next) =>{
    try {
      //returned data
      const result = await db.query('SELECT userid, first_name, last_name FROM user_data')
      //figure out how to manipulate res from db
      res.locals.users = result.rows; 
      return next();

    }catch (err){
      console.log(err);
      return next(err);
    }
  },

  //POST REQUEST to create new DB entries of sleep data per user
  createSleepEntry: async (req, res, next) => {
    try{
      console.log("from controller", req.body)
      return next();
    } catch (err){
      console.log(req.body)
    }
    
  },

  //PATCH REQUEST to update current sleep data before it 
  updateSleepEntry: async (req, res, next) =>{
    try {
      return next();
    }catch(err){

    }
  },

  //DELETE REQUEST to delete entry

  deleteSleepEntry: async (req, res, next) => {
    try{
      const {sleepid} = req.body
      const value = [sleepid]
      const result = db.query('DELETE FROM sleep WHERE VALUE($1)', value)

      console.log(`Deleted Sleep Entry ${sleepid} from DB,`, result)
      return next();
    }catch(err){
      console.log(err)
    }
  }
};

module.exports = sleepControllers;