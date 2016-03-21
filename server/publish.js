Meteor.publish('pdfs', function(){
  return Collections.PDF.find();
});

Meteor.publish("templates", function () {
    return Collections.Templates.find();
});

Meteor.publish("fields", function () {
    return Collections.Fields.find();
});

Meteor.publish("messages", function (SubscribeID) {

    //Delete all messages when the client disconnect
    this._session.socket.on("close",  Meteor.bindEnvironment(() => {
      console.log(UserID);
      Collections.Messages.remove({sid:SubscribeID});
    }));

    return Collections.Messages.find({
      sid:SubscribeID
    }, {
      fields: {'content':1}
    });
});
