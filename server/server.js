const express = require('express');
const app = express();
const path = require('path');
const ApiRouter = require('./router/api');
const AuthRouter = require('./router/auth');
const mlRouter = require('./router/ml-router');
const cookieParser = require('cookie-parser');

//OAUTH TODO: Add steps in this file as well 


app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
  });
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
};


app.use('/api', ApiRouter);

app.use('/auth', AuthRouter);

app.use('/api/ml', mlRouter);


// app.post('/register', (req, res) => {
//   res.status(200).json(res.locals.user);
// })

// app.get('/users', (req, res) => {
//   return res.status(200).send(checkFile);
// });

app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/public/index.html')));

// statically serve everything in the build folder on the route '/build'

  

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

