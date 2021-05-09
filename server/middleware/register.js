//SAVE FOR LATER DO NOT WORK ON
//ALSO PART OF SEQL CONVERSION NEEDS

// //this is good
// const jwt = require('jsonwebtoken');
// const secretPass = 'test';

// //MUST CONVERT FROM MONGO-OOSE TO SEQL
// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;

//     let decodedData;
    
//     if (token && isCustomAuth) {      
//       decodedData = jwt.verify(token, secretPass);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }    
    
//     next();
//   } catch (error) {
//     console.log('I have an error in the Middleware', error);
//   }
// };

// module.exports = auth;