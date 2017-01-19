var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('mongodb');
var expressSession = require('express-session');
var expressHbs = require('express3-handlebars');

var MongoStore = require('connect-mongo')(expressSession);


var MongoClient = mongodb.MongoClient;

var db

MongoClient.connect('mongodb://localhost:27017/mydb', (err, database) => {
  if (err) return console.log(err)
  db = database
 
})
 // for heroku you would use process.env.PORT instead

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.set('viwes',path.join(__dirname,'views'))
app.get('/',function(req,res){
	res.render('signup')
})

app.get('/index',function(req,res){
	db.collection('users1').find().toArray(function(err,result){
		if(err)
			return console.log(err)
		res.render('index.ejs',{ users1 : result})
	})
})



app.post('/signup',function(req,res){
	db.collection('users1').save(req.body, (err, result) => {
    if (err) return console.log(err)
    
    
    console.log('saved to database')
      // console.log(result)
    res.redirect('/index')

})
  })

app.listen(3000,function(){
	console.log("server running at 3000");
})