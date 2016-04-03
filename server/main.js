import Future from 'fibers/future';
import MessageSender from './tools/messageSender';
import DefaultTemplateLoader from './tools/defaultTemplateLoader';
import GeneratePDF from './generator';
import Translate from './translator';

/**
 * @summary Generate a PDF based on datas
 * @method PDFGenerate
 * @param {String} datas Object JSON object with fields and values to add in PDF
 */
function PDFGenerate(datas, selectedTemplate, subscribeID) {
  let msObject = MessageSender.generateMSObject(subscribeID);

  GeneratePDF(datas, selectedTemplate, msObject);
}

/**
 * @summary Get PDF base64 datas from the DB
 * It need a "Future" object to make some async stuff in Meteor
 * @method PDFGet
 * @param {String} name name of file to get from DB
 */
function PDFGet(name) {
  let stream = Collections.PDF.findOne(name).createReadStream();

  let future = new Future();
  let data = '';

  stream.on('data', (d) => {
    data += d;
  });

  stream.on('end', Meteor.bindEnvironment(() => {
    return future.return(data);
  }));

  return future.wait();
}

Meteor.startup(function() {
  // Load default template at server start
  console.log('Loading default templates...');
  DefaultTemplateLoader.loadAll();
});

Meteor.methods({
  'PDF.generate': PDFGenerate,
  'PDF.get': PDFGet,
  'MessageSender.generate': MessageSender.generateMSObject,
  'Translator.translate': Translate
});
