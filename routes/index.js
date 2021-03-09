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

router.get('/create-user', (req,res,next) => {
  res.render("createUser");
});

router.post('/create-user', (req,res,next) => {
  const requestBody = {
    name: req.body.name,
    address: req.body.address,
    dob: req.body.dob,
    gender:req.body.gender
  };

  let url = "http://localhost:8000/users/add";

  fetch(url,{ 
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json' }
  })
   .then(result => {
     res.redirect('/');
   }).catch(error => console.log(error));
});

router.get('/delete-user/:id',(req,res,next) => {
  let url = "http://localhost:8000/users/del/"+req.params.id;
  let option = { method: "DELETE" };

  fetch(url,option)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.log(error));

});

router.get('/update-user/:id', (req,res,next) => {
  let url = "http://localhost:8000/users/get/"+req.params.id;
  let option = { method: "GET" };
  fetch(url,option)
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(json => {
      res.render('updateUser', { user:json[0] });
    });
});

router.post('/update-user/:id',(req,res,next) =>{
  const requestBody = {
    name: req.body.name,
    address: req.body.address,
    dob: req.body.dob,
    gender:req.body.gender
  };

  let url = "http://localhost:8000/users/update-user/"+req.params.id;

  fetch(url,{ 
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json' }
  })
   .then(result => {
     res.redirect('/user/'+req.params.id);
   }).catch(error => console.log(error));
});

router.get('/add-books/:id', (req,res,next) =>{
  let url = "http://localhost:8000/users/get/"+req.params.id;
  let option = { method: "GET" };
  fetch(url,option)
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(json => {
      res.render('addBooks', { user:json[0] });
    });
});

router.post('/add-books/:id',(req,res,next) => {
  const requestBody = {
    books: [
      {
        bookId: req.body.bookId,
        bookName: req.body.bookName
      }
    ]
  };

  let url = "http://localhost:8000/users/update-user/"+req.params.id;

  fetch(url,{ 
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json' }
  })
   .then(result => {
     res.redirect('/user/'+req.params.id);
   }).catch(error => console.log(error));
});

module.exports = router;
