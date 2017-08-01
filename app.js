const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const routes = require('./routes')
const bodyParser = require('body-parser')

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
nunjucks.configure('views', { noCache: true });

app.use('/', function(req, res, next){
  console.log(req.method, req.url)
  next();
  console.log(res.statusCode)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', routes)

app.listen(3000, function(){
  console.log("server listening");
})
