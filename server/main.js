let Future = Meteor.npmRequire('fibers/future');

/**
 * Generate a PDF based on datas
 * @param {JSON} datas JSON object with fields and values to add in PDF
 */
function PDFGenerate(datas, selectedTemplate, subscribeID){
  let msObject = Meteor.myFunctions.MessageSender.generateMSObject(subscribeID);
  Meteor.myFunctions.generatePDF(datas, selectedTemplate, msObject);
}

/**
 * Get PDF base64 datas from the DB
 * It need a "Future" object to make some async stuff in Meteor
 * @param {String} name name of file to get from DB
 */
function PDFGet(name){
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
  Meteor.myFunctions.DefaultTemplateLoader.load();
});

Meteor.methods({
  'PDF.generate': PDFGenerate,
  'PDF.get': PDFGet
});
