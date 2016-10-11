var express = require('express');
var router = express.Router();
var systemserver = express();
var Mock = require('mockjs');
var rankingData= require("../jsonData/ranking-data.json");
var teamHistoryData= require("../jsonData/team-history-data.json");
var hallOfFameData= require("../jsonData/hall-of-fame-data.json");


systemserver.use('/ajax', router);
router.get('/commentlist', function (req, res, next) {
    var len = parseInt(Math.random()*10);
    if(len==0){len =1;}
    var data =[];
    for(let i=0;i<len;i++){
        var item = {
            'comment': Mock.mock('@title(5)'),
            'author':{name:Mock.mock('@word(3, 5)')}
        };
        data.push(item);
    }
    res.send({result: true, code: 0, data:data });
});

router.get('/ranking', function (req, res, next) {
    res.send({result: true, code: 0, data:rankingData });
});

router.get('/teamHistory', function (req, res, next) {
    res.send({result: true, code: 0, data:teamHistoryData });
});
router.get('/hallOfFame', function (req, res, next) {
    res.send({result: true, code: 0, data:hallOfFameData });
});


module.exports = systemserver;