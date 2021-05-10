const db = require('../models/sleepModels');

const loginControllers = {
  //POST REQUEST for user information on their sleep profile/data
  async createUser (req, res, next) {
    try {
      //returned data
      const values = Object.values(req.body.formState);
      console.log("req.body from login controller", req.body.formState)
      const check  = await db.query('SELECT * FROM user_data WHERE username = ($1)', [req.body.username])
      if(check.rowCount === 0){
      const result = await db.query('INSERT INTO public.user_data(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', values)
      //figure out how to manipulate res from db
      res.locals.users = result.rows; 
      return next();
      } else {
      res.locals.users = check.rows
      return next()
      }

    }catch (err){
      console.log(err);
      return next(err);
    }
  },

  async loginUser (req, res, next) {
      try{ 
        const loginValues = Object.values(req.body);
        const loginCheck = await db.query('SELECT * FROM user_data WHERE username = ($1) AND password = ($2)', loginValues)
        //IF the query finds
        if(loginCheck.rowCount){
          return next();
        } else {
          //test fails, no user found
          res.locals.err = 'Login incorrect username / password.'
          res.status(200).redirect('/login')
        }
      }catch (err){
      console.log(err);
      return next(err);
    }
  }
}

module.exports = loginControllers;