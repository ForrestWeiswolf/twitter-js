const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

// nunjucks.configure('views', {noCache: true});
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });

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
