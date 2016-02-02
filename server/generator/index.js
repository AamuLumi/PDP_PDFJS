let PDFKit = Meteor.npmRequire('pdfkit');
let fs = Meteor.npmRequire('fs');
let path = Meteor.npmRequire('path');

Meteor.myFunctions.generatePDF = function (textArray){
  if (!textArray) return undefined;

  let doc = new PDFKit();
  let x = 100, y = 100;
  let filename = "pdf/" + Date.now() + ".pdf";
  let publicFolder = process.env.PWD + "/public/";

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
