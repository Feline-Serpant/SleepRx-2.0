const db = require('../models/sleepModels');



const dreamController = {
    //GET REQUEST for user information on their sleep profile/data
    getUserDreams: async (req, res, next) =>{
      try {
        //returned data
        //need to make this query only select user based on parameter passed from fetch request
        const userId = req.user
        const result = await db.query('SELECT message FROM dream WHERE userid = ($1)', [userId])

        //figure out how to manipulate res from db
        res.locals.allDreams = result.rows; 
        console.log("DREAM", res.locals.allDreams)
        return next();
  
      }catch (err){
        console.log(err);
        return next(err);
      }
    },
    
    createDreamEntry: async (req, res, next) => {
        try{
          // console.log("from create sleep entry,",  req.body.values)
          //console.log(req.body.values)
          
          const {message} = req.params;
          console.log(req.user)
          console.log(message)
          const query = "INSERT INTO public.dream (userid, message) VALUES($1, $2) RETURNING *"
          // const result = await db.query('INSERT INTO public.user_data(first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', 

          const values = [req.user, message]
          const result = await db.query(query, values);
          console.log(result.rows[0])
          res.locals.createdDreamEntry = result.rows[0]
          console.log(res.locals.createdSleepEntry)
    
          // console.log(result);
    
          return next();
        } catch (err){
          console.log(err)
          next(err);
        }
        
      },

}
module.exports = dreamController