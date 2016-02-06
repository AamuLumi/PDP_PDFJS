Template.magicField.events({
  'change .fileInput': function(event, template){
    FS.Utility.eachFile(event, function(file){
      Collections.PDF.insert(file, function(err, fileObj){
        console.log(err);
      })
    })
  }
})
