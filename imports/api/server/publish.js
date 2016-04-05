import { Collections } from '../collections.js';
import { Meteor } from 'meteor/meteor';


// Distribute PDFs files to client
Meteor.publish('pdfs', function() {
  return Collections.PDF.find();
});

// Distribute templates to clients
Meteor.publish('templates', function() {
  return Collections.Templates.find();
});

// Distribute fields to clients
Meteor.publish('fields', function() {
  return Collections.Fields.find();
});

// Distribute messages to client
Meteor.publish('messages', function(subscribeID) {
  //Delete all messages when the client disconnect
  this._session.socket.on('close', Meteor.bindEnvironment(() => {
    Collections.Messages.remove({
      sid: subscribeID
    });
  }));

  return Collections.Messages.find({
    sid: subscribeID
  }, {
    fields: {
      'content': 1
    }
  });
});
