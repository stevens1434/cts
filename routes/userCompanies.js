var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Company = require('../models/company');
var User = require('../models/user')
var axios = require('axios');
const fetch = require("isomorphic-fetch");



// router.post('/user', function(req, res, next) {
//   // console.log("/cts post route: ", req.body);
//   let user = req.body.data.id
//   User.findOne({_id: user}, {password: false}, function(err, records) {
//     if(err) return res.send('err: ', err);
//     let data = {};
//     // console.log("records: ", records);
//     // console.log('records.CanChange: ', records.CanChange);
//     let firstName = records.firstName;
//     let lastName = records.lastName;
//     let email = records.email;
//     let RoleCat = records.RoleCat;
//     let RoleType = records.RoleType;
//     let Companies = records.Companies;
//     let Notes = records.Notes;
//     let ToDo = records.ToDo;
//     let Address = records.Address;
//     let id = records._id;
//     let CanChange = records.CanChange;
//     let CanDrop = records.CanDrop;
//     let Amount = records.Amount;
//     let SaleType = records.SaleType;
//     let Owner = records.Owner;
//     data.id = id;
//     data.firstName = firstName;
//     data.lastName = lastName;
//     data.email = email;
//     data.RoleCat = RoleCat;
//     data.RoleType = RoleType;
//     data.companies = Companies;
//     data.Notes = Notes;
//     data.ToDo = ToDo;
//     data.Address = Address;
//     data.CanChange = CanChange;
//     data.CanDrop = CanDrop;
//     data.Amount = Amount;
//     data.SaleType = SaleType;
//     data.Owner = Owner;
//     // console.log('query result from User db in cts/cts backend: ', data);
//     res.send(data);
//   })
// });

router.post('/user', function(req, res, next) {
  console.log('/ in usercompanies: ', req.body);
  let userId = req.body.data.id
  Company.find({userId: userId}, function(err, records) {
    if(err) return res.send('err: ', err);
    // console.log('records in /allCompanies: ', records);
    res.send(records);
  });
})


module.exports = router;
