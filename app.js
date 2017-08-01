const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const socketio = require('socket.io');
const routes = require('./routes')

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
nunjucks.configure('views', { noCache: true });

app.use('/', function(req, res, next){
  console.log(req.method, req.url)
  next();
  console.log(res.statusCode)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = app.listen(3000, function(){
  console.log("server listening");
})

const io = socketio.listen(server);

app.use('/', routes(io))
