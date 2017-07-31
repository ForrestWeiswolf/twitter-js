const express = require('express');
const app = express();

app.use('/', function(req, res, next){
  console.log(req.method, req.url)
  next();
  console.log(res.statusCode)
})

app.use('/special', function(req, res, next){
  console.log("special")
  next();
})

app.get('/special/anything', function(req, res){
  res.send('anything')
})

app.get('/something', function(req, res){
  res.send('anything')
})



app.listen(3000, function(){
  console.log("server listening");
})
