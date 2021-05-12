const express =  require('express');
const router = express.Router();




router.get('/', (req, res) => {
    res.send('got to mlrouter');
});

module.exports = router;