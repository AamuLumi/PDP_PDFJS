'use strict';

let PDFKit = require('pdfkit');
let fs = require('fs');
let path = require('path');

module.exports.generate = function generate(publicFolder, textArray){
  if (!textArray) return undefined;

  let doc = new PDFKit();
  let x = 100, y = 100;
  let filename = "pdf/" + Date.now() + ".pdf";

  console.log("Create file " + publicFolder + filename);

  doc.pipe(fs.createWriteStream(publicFolder + filename));
  doc.info.title = Date.now();

  for (let key in textArray){
    doc.text(key + " = " + textArray[key], x, y);
    y += 20;
  }

  doc.end();

  return filename;
}
