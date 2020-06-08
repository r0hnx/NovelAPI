var express = require('express');
var router = express.Router();
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/',async (req, res, next) => {
  let response;
  try {
    response = await axios.get("https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic_by_country_and_territory");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }
  const html = cheerio.load(response.data);
  var global = html('tr[class=sorttop] > th > b');
  res.json({
      cases: parseInt(global[1].children[0].data.trim().replace(/,/g, "")),
      deaths: parseInt(global[2].children[0].data.trim().replace(/,/g, "")),
      recovered: parseInt(global[3].children[0].data.trim().replace(/,/g, "")),
  });
})

module.exports = router;