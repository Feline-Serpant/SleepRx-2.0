// const { setRandomFallback } = require('bcryptjs');
// const { restart } = require('nodemon');
const bcrypt = require('bcrypt')
const db = require('../models/sleepModels');
const jwtGenerator = require('../utils/jwtGenerator');


const loginControllers = {
  async createUser (req, res, next) {
    try {
      //1.destructure the req.body
      const {first_name, last_name, username, password } = req.body;

      //2.check if the user exist doesn't exist
      const check  = await db.query('SELECT * FROM user_data WHERE username = ($1)', [username]);

      if(check.rows.length !== 0){
        return res.status(401).send('User already exist');
      }
      //3. bcrpyt the user password

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcrpytedPassword = await bcrypt.hash(password, salt);

      const result = await db.query('INSERT INTO public.user_data(first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', 
      [first_name, last_name, username, bcrpytedPassword])
      res.locals.user = result.rows; 

      //4. create a token
      const token = jwtGenerator(result.rows[0].userid);
      res.locals.token = token;
      next();
      // return next();
    }catch (err){
      console.log(err);
      return next(err);
    }
  },

  async loginUser (req, res, next) {
      try{ 
        // const loginValues = Object.values(req.body);
        const {username, password} = req.body;

        //check if the user'name doesn't exist, throw error
        const loginCheck = await db.query('SELECT * FROM user_data WHERE username = ($1)', 
        [username]);
      
        if(loginCheck.rows.length === 0){
          return res.status(401).send("Password or or Email is incorrect");
        }
        console.log(password);
        console.log(loginCheck.rows[0].password);
        //check if the password is correct
        const validPassword = await bcrypt.compare(password, loginCheck.rows[0].password);
        console.log("valid password", validPassword)
        if(!validPassword){
          return res.status(401).send("Password or or Email is incorrect");
        }
        const token = jwtGenerator(loginCheck.rows[0].userid);
        res.locals.token = token;
        next();
    
          //test fails, no user found
       
      }catch (err){
      console.log(err);
      return next(err);
    }
  }
}

module.exports = loginControllers;