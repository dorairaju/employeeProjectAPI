process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../server');

chai.should();
chai.use(chaiHttp);


/** Testing starts here **/
function returnsName(name) {
  return name;
}

describe('it is first test case', function() {
  it('retunrs name which is passed as a parameter', function(){
      returnsName("Dorai").should.equal("Dorai");
  });
});
/** Testing Ends here **/

describe('Get Employees', function() {
  it('It should GET all employees in the database', function(done) {
     chai.request(server)
       .get("/employees")
       .end(function(err, res){
         res.should.have.status(200);
         res.body.length.should.equal(3);
         done();
       });
  });
  it('It should GET employee by their id', function(done) {
     chai.request(server)
       .get("/employee/2")
       .end(function(err, res){
         res.should.have.status(200);
         res.body.length.should.equal(1);
         done();
       });
  });

});

describe('Create employee', function(){
  it('It should create a new employee in the database', function(done) {
     chai.request(server)
       .post("/employee")
       .send({"_id": 4, "fName": "Manoj", "lName": "Reddy", "mName": "middleManoj"})
       .end(function(err, res){
         console.log(res.body);
         res.should.have.status(200);
         done();
       });
  });
});

describe('update employee details', function(){
  it('It should update employee info based on id ', function(done) {
     chai.request(server)
       .put("/employee/4")
       .send({"fName": "Manojjj", "lName": "Reddy", "mName": "middleManoj"})
       .end(function(err, res){
         res.body.nModified.should.equal(1);
         done();
       });
  });
});

describe('delete employee details', function(){
  it('It should delete employee info based on id ', function(done) {
     chai.request(server)
       .delete("/employee/4")
       .end(function(err, res){
         console.log(res.body);
         //res.body.ok.should.equal(0);
         //res.should.have.status(200);
         done();
       });
  });
});
