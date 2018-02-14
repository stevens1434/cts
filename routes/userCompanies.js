var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Company = require('../models/company');
var User = require('../models/user')
var axios = require('axios');
var Schema = mongoose.Schema; //this is new
const fetch = require("isomorphic-fetch");

router.post('/amount', function(req, res, next) {
  const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'OpsReceived', 'OpsOngoing', 'OpsCompleted', 'AccReceived', 'AccCompleted'];
  Company.find({}, 'StageHistory.StageName StageHistory.DateEntered StageHistory.DateCompleted Amount')
    .populate({path: 'StageName DateEntered DateCompleted'})
    .exec(function(err, records) {
      let finalData = [];
      records.forEach((data, index) => {
        // console.log("amount: ", data.Amount);
        const Amt = data.Amount;
        let amount = [];
        let result = {}
        result.amount = data.Amount;
        const info = data.StageHistory
        for (var i in info) {
          if (info[i].StageName !== undefined) {
            let currentStage = '';
            if (stages[i] !== undefined) {
              currentStage = stages[i];
            }
            // console.log('info[i]: ', info[i])
            result.stageName = info[i].StageName
            // console.log('info[i]: ', info[i]);
            // console.log('result: ', result);
            // finalData.push(result);
          }
          finalData.push(result);
        }
      })
      res.send(finalData);
    })
})

router.post('/userAmount', function(req, res, next) {
  let userId = req.body.data.id
  const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'OpsReceived', 'OpsOngoing', 'OpsCompleted', 'AccReceived', 'AccCompleted'];
  Company.find({userId: userId}, 'StageHistory.StageName StageHistory.DateEntered StageHistory.DateCompleted Amount')
    .populate({path: 'StageName DateEntered DateCompleted'})
    .exec(function(err, records) {
      let finalData = [];
      records.forEach((data, index) => {
        console.log("data: ", data);
        const Amt = data.Amount;
        let amount = [];
        let result = {}
        result.amount = data.Amount;
        const info = data.StageHistory
        for (var i in info) {
          if (info[i].StageName !== undefined) {
            let currentStage = '';
            if (stages[i] !== undefined) {
              currentStage = stages[i];
            }
            // console.log('info[i]: ', info[i])
            result.stageName = info[i].StageName
            // console.log('info[i]: ', info[i]);
            // console.log('result: ', result);
            finalData.push(result);
          }
          // finalData.push(result);
        }
      })
      res.send(finalData);
    })
})

router.post('/efficiency', function(req, res, next) {
  const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'OpsReceived', 'OpsOngoing', 'OpsCompleted', 'AccReceived', 'AccCompleted'];
  Company.find({}, 'StageHistory.StageName StageHistory.DateEntered StageHistory.DateCompleted')
    .populate({path: 'StageName DateEntered DateCompleted'})
    .exec(function(err, records) {
      let finalData = [];
      records.forEach((data, index) => {
          const info = data.StageHistory
          for (var i in info) {
            if (info[i].StageName !== undefined) {
              let currentStage = '';
              if (stages[i] !== undefined) {
                currentStage = stages[i];
              }
              const result = info[i];
              finalData.push(result);
            }
          }
      })
      res.send(finalData);
    })
})

router.post('/userefficiency', function(req, res, next) {
  // console.log('req.body.data.id: ', req.body.data.id)
  let userId = req.body.data.id
  const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'OpsReceived', 'OpsOngoing', 'OpsCompleted', 'AccReceived', 'AccCompleted'];
  Company.find({userId: userId}, 'StageHistory.StageName StageHistory.DateEntered StageHistory.DateCompleted')
    .populate({path: 'StageName DateEntered DateCompleted'})
    .exec(function(err, records) {
      let finalData = [];
      records.forEach((data, index) => {
          const info = data.StageHistory
          for (var i in info) {
            if (info[i].StageName !== undefined) {
              let currentStage = '';
              if (stages[i] !== undefined) {
                currentStage = stages[i];
              }
              const result = info[i];
              finalData.push(result);
              // console.log('finalData: ', finalData);
            }
          }
      })
      res.send(finalData);
    })
})

router.post('/user', function(req, res, next) {
  // console.log('/ in usercompanies: ', req.body);
  let userId = req.body.data.id
  Company.find({userId: userId}, function(err, records) {
    if(err) return res.send('err: ', err);
    // console.log('records in /allCompanies: ', records);
    res.send(records);
  });
})


module.exports = router;
