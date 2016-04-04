import PdfPrinter from 'pdfmake';
import Future from 'fibers/future';
import base64 from 'base64-stream';
import TemplateInterpreter from './templateInterpreter';
import MessageSender from '../tools/messageSender';

export default function generatePDF(textArray,
  templateName, msObject) {

  // Base filename is <timestamp>.pdf
  let filename = Date.now() + '.pdf';

  MessageSender.new({
    fileGeneration: true,
    title: 'PDF en cours de génération..',
    name: filename,
    percent: 20,
    type: 'info'
  }, msObject);

  if (!textArray) {
    return undefined;
  }

  let fonts = {
    Roboto: {
      normal: '../web.browser/app/fonts/Roboto-Regular.ttf',
      bold: '../web.browser/app/fonts/Roboto-Medium.ttf',
      italics: '../web.browser/app/fonts/Roboto-Italic.ttf',
      bolditalics: '../web.browser/app/fonts/Roboto-BoldItalic.ttf'
    }
  };

  let printer = new PdfPrinter(fonts);

  // Buffer string to store Base64 PDF before adding to the DB
  let bufferString = '';

  // We need future to create async methods in Meteor
  let future = new Future();

  let tObject = undefined;

  console.log('Interpreting template');

  tObject = TemplateInterpreter.templateToObject(
    textArray, templateName);

  console.log('Creating PDF document');

  let pdfDoc = printer.createPdfKitDocument(tObject);

  let stream = pdfDoc.pipe(base64.encode());

  pdfDoc.end();

  console.log('Encoding PDF document');

  MessageSender.new({
    fileGeneration: true,
    title: 'PDF en cours de génération..',
    name: filename,
    percent: 60,
    type: 'info'
  }, msObject);

  // Concatenate data in the bufferString
  stream.on('data', (d) => {
    bufferString += d;
  });

  // At the end of buffer, create FS.File and add it to DB
  stream.on('end', Meteor.bindEnvironment(() => {
    try {
      console.log('Storing PDF document');

      let fileOutput = new FS.File();

      // File settings
      fileOutput._id = filename;
      fileOutput.extension('pdf');
      fileOutput.type('application/pdf');
      fileOutput.name(filename);
      fileOutput.encoding = 'binary';

      // Add data
      fileOutput.attachData(new Buffer(bufferString), {
        type: 'application/pdf'
      });

      // Insertion in DB
      Collections.PDF.insert(fileOutput);

      // Return the filename when all finished
      future.return({
        fileGeneration: true,
        title: 'PDF généré !',
        name: filename,
        size: fileOutput.size(),
        type: 'success',
        percent: 100
      });
    } catch (e) {
      future.return(e);
    }
  }));

  // Wait all process finish
  MessageSender.new(future.wait(), msObject);
}
