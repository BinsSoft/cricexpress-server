
var router = global.express.Router();


var home = require("../controllers/DataController");
global.app.use(function(req, response, next) {
   response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type");
  return next();
});
router.get("/", home.index);
router.get("/match/:id", home.details);
router.get("/match-score/:id", home.renderMatchScore);
router.get("/series", home.renderSeries);
router.get("/series-details/:id/:slug", home.renderSerieDetails);
router.get("/ranking/:type", home.randerRanking)
router.get("/ranking/:type/:matchType/:position", home.randerRanking)
router.get("/news", home.renderNews);

module.exports = router;
