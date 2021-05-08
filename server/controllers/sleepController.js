const db = require('../models/sleepModels');

const sleepControllers = {
  //GET REQUEST for user information on their sleep profile/data
  getUserData = async (req, res, next) =>{
    try {
      return next ();
    }catch (err){
      
    }
  },

  //POST REQUEST to create new DB entries of sleep data per user
  createSleepEntry = async (req, res, next) => {
    try{
        return next ();
    } catch (err){
        
    }
    
  },

  //PATCH REQUEST to update current sleep data before it 
  updateSleepEntry = async (req, res, next) =>{
    try {
      return next();
    }catch(err){
        
    }
  },

  //DELETE REQUEST to delete entry

  deleteSleepEntry = async (req, res, next) => {
    try{
          return next();
    }catch(err){

    }
  }
};

module.exports = sleepControllers;