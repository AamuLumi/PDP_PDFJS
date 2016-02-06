Collections = {};

// Add helper Collections for Client
Meteor.isClient && Template.registerHelper("Collections", Collections);

Collections.PDF = new FS.Collection("pdfs", {
  stores: [Stores.PDF]
});
