var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async (req, res, next) => {
    let response;
    try {
        // response = await axios.get('https://novelapi.herokuapp.com/country');
        response = await axios.get('https://novelapi.herokuapp.com/all');
        if (response.status !== 200) {
            console.log("ERROR");
        }
    } catch (err) {
        return {};
    }
    res.render('index', {data : response.data});
})

module.exports = router;