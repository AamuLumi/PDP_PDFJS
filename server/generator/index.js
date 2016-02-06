let PDFKit = Meteor.npmRequire('pdfkit');
let fs = Meteor.npmRequire('fs');
let path = Meteor.npmRequire('path');
let Future = Meteor.npmRequire('fibers/future');
let base64 = Meteor.npmRequire('base64-stream');

/**
 * Generate a PDF
 * @param  {JSON} textArray JSON object with fields and values to add
 *                          to the PDF
 * @return {String} the filename
 */
Meteor.myFunctions.generatePDF = function(textArray) {
  if (!textArray) return undefined;

  // We need future to create async methods in Meteor
  let future = new Future();

  // Base filename is <timestamp>.pdf
  let filename = Date.now() + ".pdf";

  // Buffer string to store Base64 PDF before adding to the DB
  let bufferString = "";

  /**
   * Create the PDF
   */
  let doc = new PDFKit();
  let x = 100,
    y = 100;

  doc.info.title = Date.now();

  for (let key in textArray) {
    doc.text(key + " = " + textArray[key], x, y);
    y += 20;
  }

  console.log("Create file " + filename);

  // Create a Base64 pipe to encode PDF
  let stream = doc.pipe(base64.encode());
  doc.end();

  // Concatenate data in the bufferString
  stream.on('data', (d) => {
    bufferString += d;
  })

  // At the end of buffer, create FS.File and add it to DB
  stream.on('end', Meteor.bindEnvironment(() => {
    try {
      let fileOutput = new FS.File();

      // File settings
      fileOutput._id = filename;
      fileOutput.extension("pdf");
      fileOutput.type("application/pdf");
      fileOutput.name(filename);
      fileOutput.encoding = 'binary';

      // Add data
      fileOutput.attachData(new Buffer(bufferString), {
        type: "application/pdf"
      });

      // Insertion in DB
      Collections.PDF.insert(fileOutput);

      // Return the filename when all finished
      future.return(filename);
    }
    catch (e) {
      future.return(e);
    }
  }));

  // Wait all process finish
  return future.wait();
};
