var mongoose = require('mongoose');
var db = require('../model/db.js');
var _ = require('underscore');

//GET all employees from the data base
function getEmployees(req, resp) {
  db.find(function(err, data){
      if(err){
          resp.status(500).send();
      } else {
          resp.status(200).send(data);
      }
  });
}

//GET employee by id
function getEmployee(req, resp) {
  db.find({_id: req.params.id}, function(err, data){
      if(err){
          resp.status(500).send();
      } else if (data.length === 0){
          resp.status(404).send({error: "No employee with the given id."});
      } else {
          resp.status(200).send(data);
      }
  });
}

//POST employee
function postEmployee(req, resp) {
  var temp = req.body;
  var emp = new db({_id: temp._id, fName: temp.fName,
     lName: temp.lName, mName: temp.mName});

  emp.save(function(err) {
      if (err){
          resp.status(404).send({"error":err});
      } else {
          resp.status(200).send(emp);
      }

  });
}

//Saving employee
function putEmployee(req, resp)  {
  if(!_.isEmpty(req.body)) {

    var condition = { _id: req.params.id};
    var update = req.body;

    db.update(condition, update, function(err, data) {
        if(err){
            resp.status(500).send();
        } else {
            resp.status(200).send(data);
        }
    });

  } else {
     resp.status(500).send();
  }
}

//Deleting employee from the database
function deleteEmployee(req, resp) {
  db.remove({_id: req.params.id}, function(err, data){

      if(err){
          resp.status(500).send();
      } else if(data.result.n === 0){
          resp.status(404).send({error: "No employee with the given id."});
      } else {
          resp.status(200).send(data);
      }

  });
}


module.exports = {getEmployees, postEmployee, getEmployee, putEmployee, deleteEmployee};
