/**
* Load some basics templates at startup
*/
let messageSender = function() {};

messageSender.prototype.new = function(title, object, SubscribeID) {

  Collections.Messages.upsert({
    title: title,
    sid:SubscribeID
  },{
    content :object,
    sid:SubscribeID,
    title: title
  });

};

Meteor.myFunctions.messageSender = new messageSender();
