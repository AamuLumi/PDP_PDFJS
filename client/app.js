// Disable hot reload
Meteor._reload.onMigrate(function() {
  return [false];
});

let Templates = new Mongo.Collection("templates");
