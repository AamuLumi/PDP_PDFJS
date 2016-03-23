let messageSender = function() {};

messageSender.prototype.generateMSObject = function(subscribeID) {

  let d = new Date().getTime();
  let mid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     let r = (d + Math.random()*16)%16 | 0;
     d = Math.floor(d/16);
     return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });

  return {sid: subscribeID, mid: mid};

};

messageSender.prototype.new = function(object, msObject) {

  if (msObject.sid != 'server'){
    Collections.Messages.upsert({
      mid:msObject.mid,
      sid:msObject.sid
    },{
      content:object,
      sid:msObject.sid,
      mid: msObject.mid
    });
  }
  else{
    console.log(object);
  }

};

Meteor.myFunctions.messageSender = new messageSender();
