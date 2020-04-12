var express = require('express');
var router = express.Router();
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/', async function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  console.log("GET " + ip +' : REQ ' + '\'/\'');
  let response;
  try {
    response = await axios.get("https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic_by_country_and_territory");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }

  var result = [];
  const html = cheerio.load(response.data);

  var data = html('#thetable').children('tbody').children('tr').children('td');
  var names = html('#thetable').children('tbody').children('tr').children('th');

  for (let i = 11; i < names.length; i += 2) {
    let url = `https://en.wikipedia.org${names[i].children[0].attribs.href}`;
    let country = names[i].children[0].children[0].data || names[i].children[0].children[0].children[0].data || "";
    let response;
    try {
      response = await axios.get(url);
      if (response.status !== 200) {
        console.log("ERROR");
      }
    } catch (err) {
      return null;
    }
    let $ = cheerio.load(response.data);
    var map = $('a[class=image]');
    result.push({
      name: country.trim(),
      img: `https:${names[i-1].children[0].attribs.src.replace('23px', '128px')}`,
      url: url.trim(),
      map: map[1].children[0].attribs.src.replace('220px', '480px')
    });
  }

  for (let i = 0; i < data.length - (data.length % 4); i += 4) {
    let cases = data[i].children[0].data || '0';
    result[i / 4].cases = typeof (cases) == null ? 0 : parseInt(cases.trim().replace(/,/g, ""));
    let deaths = data[i + 1].children[0].data || '0';
    result[i / 4].deaths = typeof (deaths) == null ? 0 : parseInt(deaths.trim().replace(/,/g, ""));
    let recovered = data[i + 2].children[0].data || '0';
    result[i / 4].recovered = typeof (recovered) == null ? 0 : parseInt(recovered.trim().replace(/,/g, ""));
  }
  res.json({
    length: result.length,
    result: result,
  });
});

module.exports = router;