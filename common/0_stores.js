Stores = {};

Stores.PDF = new FS.Store.GridFS('pdfs');

Stores.FilesToProcess = new FS.Store.FileSystem('filestoprocess', {
  path: '../web.browser/app/TempFiles'
});

Stores.FilesToProcess.on('stored', Meteor.bindEnvironment(
  function(storeName, fileObj) {
    let msObject = null;

    msObject = Meteor.myFunctions.MessageSender
      .generateMSObject(fileObj.metadata.subscribeID);

    Meteor.myFunctions.translate(fileObj._id, fileObj.name(),
      msObject);
  }));
