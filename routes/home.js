var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async (req, res, next) => {
    let response;
    try {
        response = await axios.get('https://novelapi.herokuapp.com/country');
        allResponse = await axios.get('https://novelapi.herokuapp.com/all');
        if (response.status !== 200 && allResponse !== 200) {
            console.log("ERROR");
        }
    } catch (err) {
        return null;
    }
    res.render('home', {data : response.data, all: allResponse.data});
})

module.exports = router;