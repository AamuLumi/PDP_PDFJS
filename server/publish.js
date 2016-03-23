Meteor.publish('pdfs', function(){
  return Collections.PDF.find();
});

Meteor.publish("templates", function () {
    return Collections.Templates.find();
});

Meteor.publish("fields", function () {
    return Collections.Fields.find();
});

Meteor.publish("messages", function (subscribeID) {

    //Delete all messages when the client disconnect
    this._session.socket.on("close",  Meteor.bindEnvironment(() => {
      console.log(subscribeID);
      Collections.Messages.remove({sid:subscribeID});
    }));

    return Collections.Messages.find({
      sid:subscribeID
    }, {
      fields: {'content':1}
    });
});
