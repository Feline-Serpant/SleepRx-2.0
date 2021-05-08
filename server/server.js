const express = require('express');
const app = express();
const path = require('path');

// uncomment the below for proxy challenge

const checkFile = [ 'This is a checkin', 'test only purpose'];

app.get('/users', (req, res) => {
  return res.status(200).send(checkFile);
});


// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
};
  
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

