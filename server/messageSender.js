/**
 * @summary Constructor for the Message Sender.
 * An MessageSender object is returned by Meteor.myFunctions.MessageSender
 * This class is used to add or update a message in the collection Collections.Messages.
 * This collection can be accessed by the client by subscribing with his unique subscribeID
 * and only return messages intended for it.
 * @instancename MessageSender
 * @class
 */
let MessageSender = function() {};

/**
 * @summary Return an object containing the message ID
 * (a randomly generated unique ID)
 * and the subscribe ID to add a new message to the collection
 * Collections.Messages with [`MessageSender`](#new)
 * @method generateMSObject
 * @memberOf MessageSender
 * @param {String} subscribeID Subscribe id, if equal 'server' the message
 * will be logged to the console
 * @returns {Object} Object
 * @returns {Object.sid} Subscribe id
 * @returns {Object.mid} Message id
 */
MessageSender.prototype.generateMSObject = function(subscribeID) {

  let d = new Date().getTime();
  let mid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

  return {
    sid: subscribeID,
    mid: mid
  };

};

/**
 * @summary Send a new message or update a existing message
 * @method new
 * @memberOf MessageSender
 * @param {String} message The message to add to the collection
 * Collections.Messages
 * @param {Object} msObject containing the message ID and subscribe ID,
 * see [`MessageSender`](#new)
 */
MessageSender.prototype.new = function(message, msObject) {
  if (msObject.sid !== 'server') {
    Collections.Messages.upsert({
      mid: msObject.mid,
      sid: msObject.sid
    }, {
      content: message,
      sid: msObject.sid,
      mid: msObject.mid
    });
  } else {
    console.log(message);
  }
};

Meteor.myFunctions.MessageSender = new MessageSender();
