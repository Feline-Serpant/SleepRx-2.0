const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/api');
require('dotenv').config();
const cookiSession = require('cookie-session')

//OAUTH TODO: Add steps in this file as well 


app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
  });
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
};

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
app.use(cookiSession({
  secret:'cookie_secret'
}))

//first GITHUB request:
const loginRoute = (req, res) => {
    app.get('/login/github', (req, res) => {
        const url = 'https://github.com/login/oauth/authorize'
        res.redirect(url)
    });
}

//second GITHUB request:
const loginController = (req, res) => {
    app.get('/login/github/callback', async (req, res) => {
        const code = req.query.code
        const token = await getAccessToken(code)
        const githubData = await getGithubUser(token)
        console.log(githubData); // should get back the object;
        console.log(token); //specific user token;

            if(githubData){
                res.locals.githubId = githubData.id
                res.status(200).send(res.locals.githubId)
                req.session.githubId = githubData.id
                req.session.token = token

                res.redirect('/tracker')
                //leave root for now, change later to tracker path
            }
    });
};

//access token fetch logic
async function getAccessToken(code){
    const res = await fetch(`https://github.com/login/oauth/access_token`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    });
    const data = await res.text()
    const params = new URLSearchParams(data)
    return useParams.get('access_token')
};

//githuber user fetch logic
async function getGithubUser(access_token){
    const req = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    // ! The data should arrive on an object (name, id, etc...). Will double check.
    const data = await req.json()
    return data
};

app.use('/api', router);


app.post('/register', (req, res) => {
  res.status(200).json(res.locals.user);
})

// app.get('/users', (req, res) => {
//   return res.status(200).send(checkFile);
// });

app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/public/index.html')));

// statically serve everything in the build folder on the route '/build'

  

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

