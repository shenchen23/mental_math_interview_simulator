var express = require("express");

var app = express();
var bodyParser = require("body-parser");


function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
  }


var a = getRandomArbitrary(10,99);
var b = getRandomArbitrary(10,99);
var c = a + b ;
var sign = " + ";
var sample_q = a.toString()+ sign + b.toString() + " = ?"
var sample_a = c.toString()
var mask = ' '

var seconds = 0;
var second_string = ''


function generate_question(sign){
	if (sign == 0){
	a = getRandomArbitrary(10,99);
	b = getRandomArbitrary(10,99);}
	else{	a = getRandomArbitrary(100,999);
		b = getRandomArbitrary(100,999);}

	if (Math.round(Math.random()) == 1){
		sign = ' + ';
		c = a + b ;
	} 
	else{	sign = ' - ';
			c = a - b ;}

	sample_q = a.toString()+ sign + b.toString() + " = ? ";
	sample_a = c.toString();
	mask = ' ';
	seconds = 0;
	second_string = '';
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

var friends = ["John", "Mary", "Tom"];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});


app.post("/jump_to_question", function(req, res) {

	res.redirect("/question");
});
 

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});
 
app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends});
});

app.post("/new_question", function(req, res) {
	generate_question(0);
	res.redirect("/question");
});

app.post("/new_question_2", function(req, res) {
	generate_question(1);
	res.redirect("/question");
});

app.post("/show_answer", function(req, res) {
	mask = "Answer: " + sample_a;
	if (seconds <= 7) {
		second_string = "You used "+ seconds.toString() + " seconds. Not bad.";
	  } else {
		second_string = seconds.toString() + " seconds. Way too much.";
	  }
	res.redirect("/question");
});


app.get("/question", function(req, res) {
	res.render("question", {q: sample_q, a: mask, time_passed: second_string})
});

function incrementSeconds() {
    seconds += 1;
}

function report() {
    console.log(seconds);
}

var count_time = setInterval(incrementSeconds, 1000);


console.log(sample_q)

app.listen(4000, function() {
	console.log("Server starts on 4000");
})