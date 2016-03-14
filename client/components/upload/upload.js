Template.upload.events({
  'change .file': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Collections.FilesToProcess.insert(file, function (err, fileObj) {
      });
    });
  }
});
