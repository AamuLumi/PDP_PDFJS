upFile = new Mongo.Collection("upFile");

function beginStorage(fileObj) {

    // Si on est sur le client, on téléverse les données
    if (Meteor.isClient) {
      self.options.uploader && self.options.uploader(fileObj);
    }

    // Si on est sur le serveur, on enregistre les binaires
	// afin qu'ils sont disponible lors de l'utilisation de FileWorker
    else if (Meteor.isServer) {
      fileObj.createReadStream().pipe(FS.TempStore.createWriteStream(fileObj));
    }
}

  function checkAndInsert(fileObj) {
    
    if (!self.allowsFile(fileObj)) {
      return FS.Utility.handleError(callback, 'FS.Collection insert: file does not pass collection filters');
    }

    
    fileObj.collectionName = self.name;

    
    if (callback) {
      fileObj._id = self.files.insert(FS.Utility.cloneFileRecord(fileObj), function(err, id) {
        if (err) {
          if (fileObj._id) {
            delete fileObj._id;
          }
        } else {
          
          fileObj._id = id;
         
          beginStorage(fileObj);
        }
        callback(err, err ? void 0 : fileObj);
      });
    } else {
      fileObj._id = self.files.insert(FS.Utility.cloneFileRecord(fileObj));
      
      beginStorage(fileObj);
    }
    return fileObj;
  }
  
