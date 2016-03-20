Meteor.publish('pdfs', function(){
  return Collections.PDF.find();
});

Meteor.publish("templates", function () {
    return Collections.Templates.find();
});

Meteor.publish("fields", function () {
    return Collections.Fields.find();
});

Meteor.publish("messages", function () {
    return Collections.Messages.find();
});
