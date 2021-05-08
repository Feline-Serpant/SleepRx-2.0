const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/api');

// uncomment the below for proxy challenge

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
  });
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'

};


app.use('/api', router);




app.get('/users', (req, res) => {
  return res.status(200).send(checkFile);
});

app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/public/index.html')));

// statically serve everything in the build folder on the route '/build'

  

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

