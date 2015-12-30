'use strict';

var path = require('path');

/*
 *  * GET home page.
 *   */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function(req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function(err, html) {
        if(err) {
            console.log("Error rendering partial '" + requestedView + "'\n", err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};
