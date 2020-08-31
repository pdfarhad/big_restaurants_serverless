'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const co = require('co');

var html;

function* load_html() {
 if (!html) {
   html = yield fs.readFileAsync('static/index.html', "utf-8");
 }
 return html;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
 html = yield load_html();
 const response = {
   statusCode: 200,
   body: html,
   headers: {
     'Content-Type': 'text/html; charset=UTF-8'
   }
 };

 callback(null, response);
});