let StoresObj = {};

StoresObj.PDF = new FS.Store.GridFS('pdfs');

StoresObj.FilesToProcess = new FS.Store.FileSystem('filestoprocess', {
  path: '../web.browser/app/TempFiles'
});

StoresObj.FilesToProcess.on('stored', Meteor.bindEnvironment(
  function(storeName, fileObj) {

    if (!fileObj.hasOwnProperty('metadata'))
      fileObj.metadata = {subscribeID:'server_Hide'};

    Meteor.call('MessageSender.generate',
      fileObj.metadata.subscribeID
    , (err, res) => {
      if (err) console.err(err);
      if (res)
        Meteor.call('Translator.translate',
          fileObj._id,
          fileObj.name(),
          res
        );
    });
  }));

export const Stores = StoresObj;
