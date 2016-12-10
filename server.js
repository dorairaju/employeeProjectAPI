var express = require('express');
var app = express();
var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var employee = require('./routes/employee.js');

mongoose.Promise = global.Promise;

if( process.env.NODE_ENV === 'test') {

  //mockgoose(mongoose).then(function() {
        mongoose.connect('mongodb://localhost:27017/TestingDB');
  //});

    //var myDb = mongoose.connect('mongodb://localhost:27017/TestingDB');
}
else {
    //var myDb = mongoose.connect('mongodb://localhost:27017/codeChallenge2');
    mongoose.connect('mongodb://localhost:27017/codeChallenge2');
}


app.use(express.static(__dirname + '/public'));

app.listen('8080', function() {
    console.log('I am listening on port 8080');
});

app.use(bodyParser.json());
app.use(cors());

app.route('/employee').post(employee.postEmployee);

app.route("/employees").get(employee.getEmployees);

app.route("/employee/:id")
   .get(employee.getEmployee)
   .put(employee.putEmployee)
   .delete(employee.deleteEmployee);


module.exports = app; // for testing
