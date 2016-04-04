/**
 * Unit tests for the Message module
 */

import MessageSender from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';
import {
  StubCollections
}
from 'meteor/stub-collections';
import {
  Collections
}
from '../../../collections.js';


describe('Message Sender', function() {

  describe('Tools methods', function() {

    it('generateMSObject(String)', function() {
      let result = MessageSender.generateMSObject(
        'Test');
      let regex = new RegExp(
        '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
      );
      chai.assert.isTrue(regex.test(result.mid));
      chai.assert.equal(result.sid, 'Test');
    });

  });

  describe('Main method', function() {

    it('new(Object, Object)', function() {

      //We redirect the collection's methods to a local collection
      StubCollections.stub(Collections.Messages);
      //We send a message
      MessageSender.new('Message', {
        sid: '3521',
        mid: '16953'
      });
      //We count the number of corresponding numbers in the collection
      let n = Collections.Messages.find({
        sid: '3521',
        mid: '16953'
      }).count();

      let result = Collections.Messages.findOne({
        sid: '3521',
        mid: '16953'
      });

      chai.assert.isAbove(n, 0);
      chai.assert.equal(n, 1);
      chai.assert.equal(result.sid, '3521');
      chai.assert.equal(result.mid, '16953');
      chai.assert.equal(result.content, 'Message');

      //On restore la collection
      StubCollections.restore();

    });

  });

});
