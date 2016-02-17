Meteor.publish('pdfs', function(){
  return Collections.PDF.find();
});
