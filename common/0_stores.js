Stores = {};

Stores.PDF = new FS.Store.GridFS('pdfs');

Stores.FilesToProcess = new FS.Store.FileSystem("filestoprocess", {
  path: "../web.browser/app/TempFiles"
});

Stores.FilesToProcess.on("stored", Meteor.bindEnvironment(function(storeName, fileObj){
  console.log(fileObj._id);
  Meteor.myFunctions.translate(fileObj._id, fileObj.name());
}));
