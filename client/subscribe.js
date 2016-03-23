//Set unique id to subscribe to messages for this client only
Session.set('subscribeID', (new Date).getTime());

Meteor.subscribe('pdfs');
Meteor.subscribe('templates');
Meteor.subscribe('fields');
Meteor.subscribe('messages', Session.get('subscribeID'));
