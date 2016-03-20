Collections = {};

// Add helper Collections for Client
Meteor.isClient && Template.registerHelper('Collections', Collections);

Collections.PDF = new FS.Collection('pdfs', {
  stores: [Stores.PDF]
});

Collections.FilesToProcess = new FS.Collection('filestoprocess', {
  stores: [Stores.FilesToProcess]
});

Collections.Templates = new Mongo.Collection("templates");

Collections.Fields = new Mongo.Collection("fields");

Collections.Messages = new Mongo.Collection("messages", { connection: null });
