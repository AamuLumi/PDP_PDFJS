import '../form/form.js';
import '../messages/messages.js';
import './home.html';


// Disable hot reload
Meteor._reload.onMigrate(function() {
  return [false];
});
