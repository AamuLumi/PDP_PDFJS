// Disable hot reload
Meteor._reload.onMigrate(function() {
  return [false];
});
