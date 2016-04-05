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

      StubCollections.stub(Collections.Messages);
      MessageSender.new('Message', {
        sid: '3521',
        mid: '16953'
      });
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
      MessageSender.new('Message', {
        sid: 'server_Hide',
        mid: '48512'
      });
      n = Collections.Messages.find({
        mid: '48512'
      }).count();
      chai.assert.equal(n, 0);
      StubCollections.restore();

    });

  });

});
