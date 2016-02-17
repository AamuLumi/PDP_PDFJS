Template.magicField.events({
  'change .fileInput': function(event, template){
    console.log(template);
    FS.Utility.eachFile(event, function(file){
      Collections.PDF.insert(file, function(err, fileObj){
        if (err) {
          console.log(err);
        } else {
          console.log(fileObj);
        }
      });
    });
  }
});
