// // import { useParams } from "react-router";

// const client_id = process.env.CLIENT_ID
// const client_secret = process.env.CLIENT_SECRET

// //first GITHUB request:
// const loginRoute = (req, res) => {
//     app.get('/login/github', (req, res) => {
//         const url = 'https://github.com/login/oauth/authorize'
//         res.redirect(url)
//     });
// }

// //second GITHUB request:
// export const loginController = (req, res) => {
//     app.get('/login/github/callback', async (req, res) => {
//         const code = req.query.code
//         const token = await getAccessToken(code)
//         const githubData = await getGithubUser(token)

//             if(githubData){
//                 res.locals.githubId = githubData.id
//                 res.status(200).send(res.locals.githubId)
//                 req.session.githubId = githubData.id
//                 req.session.token = token

//                 res.redirect('/')
//                 //leave root for now, change later to tracker path
//             }
//     });
// };

// //access token fetch logic
// async function getAccessToken(code){
//     const res = await fetch(`https://github.com/login/oauth/access_token`, {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             client_id,
//             client_secret,
//             code
//         })
//     });
//     const data = await res.text()
//     const params = new URLSearchParams(data)
//     return useParams.get('access_token')
// };

// //githuber user fetch logic
// async function getGithubUser(access_token){
//     const req = await fetch('https://api.github.com/user', {
//         headers: {
//             Authorization: `bearer ${access_token}`
//         }
//     });
//     // ! The data should arrive on an object (name, id, etc...). Will double check.
//     const data = await req.json()
//     return data
// };

// // export default loginRoute;