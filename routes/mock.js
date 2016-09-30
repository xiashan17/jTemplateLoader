var express = require('express');
var router = express.Router();
var systemserver = express();
var Mock = require('mockjs')


systemserver.use('/ajax', router);
router.get('/commentlist', function (req, res, next) {
    var len = parseInt(Math.random()*10);
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
module.exports = systemserver;