Stores = {};

Stores.PDF = new FS.Store.GridFS('pdfs');

Stores.FilesToProcess = new FS.Store.FileSystem('filestoprocess', {
  path: '../web.browser/app/TempFiles'
});

Stores.FilesToProcess.on('stored', Meteor.bindEnvironment(
  function(storeName, fileObj) {
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
