// require("@babel/runtime/regenerator");
require('@babel/register'); //transform the app.js syntax
// require("webpack-hot-middleware/client?reload=true&noInfo=true");
require('popper.js/dist/popper');

// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     var $ = require("jquery")(window);
// });
require('jquery/dist/jquery.slim');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require("./main.sass");
require("./images/link.jpg");
require("./index.html");
require('./App/app.js');
