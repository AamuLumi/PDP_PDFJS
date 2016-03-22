Template.upload.events({
  'change .file': function(event, template) {
    FS.Utility.eachFile(event, function(file) {

      let filefs = new FS.File(file);

      filefs.metadata = {
          subscribeID: Session.get('subscribeID')
      };

      Collections.FilesToProcess.insert(filefs, function (err, fileObj) {
      });
    });
  }
});
