var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  let url = "http://localhost:8000/users";
  let option = { method: "GET" };
  let users = [];
  fetch(url,option)
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(json => {
      users = json;
      res.render('index', { users: users });
    });
});

router.get('/user/:id',(req,res,next) => {
  let url = "http://localhost:8000/users/get/"+req.params.id;
  let option = { method: "GET" };
  fetch(url,option)
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(json => {
      res.render('getUser', { user:json[0] });
    });
});

module.exports = router;
