'use strict';

let fs = require('fs');
let path = require('path');

module.exports.translate = function translate(data, filename){
  let ext = path.extname(filename);
  let translator = undefined;

  if (ext === ".xml")
    translator = require('./xml');


  if (translator)
    return translator.translate(data);
  else
    return undefined;
}
