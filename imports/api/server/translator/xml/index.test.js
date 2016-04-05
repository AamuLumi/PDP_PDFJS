/**
 * Unit tests for the XML Translator module
 */

import Translator from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';
Translator.msObject = {
  sid: 'server_Hide',
  mid: 0
};

describe('XML Translator', function() {

  describe('Tools methods', function() {

    it('toJSON(String)', function() {
      let xml =
        '<content><text bold="true">Hello</text></content>';
      let expect = {
        'template': {
          'content': {
            'text': {
              '@text': 'Hello',
              '@': ['bold'],
              'bold': 'true'
            }
          }
        },
        'fields': []
      };

      chai.assert.deepEqual(Translator.toJSON(xml),
        expect);
    });

    it('getFields(String)', function() {
      let xmlEmpty = {
        'content': ''
      };
      let xmlOneField = {
        'content': {
          'field': {
            '@': ['type'],
            'type': 'date'
          }
        }
      };
      let xmlThreeFields = {
        'content': {
          'field': [{
            '@': ['type'],
            'type': 'number'
          }, {
            '@': ['type'],
            'type': 'date'
          }, {
            '@': ['type', 'default'],
            'type': 'text',
            'default': ''
          }]
        }
      };

      let expectXmlEmpty = [];
      let expectXmlOneField = [{
        '@': ['type'],
        'type': 'date'
      }];
      let expectXmlThreeFields = [{
        '@': ['type'],
        'type': 'number'
      }, {
        '@': ['type'],
        'type': 'date'
      }, {
        '@': ['type', 'default'],
        'type': 'text',
        'default': ''
      }];

      chai.assert.deepEqual(Translator.getFields(
        xmlEmpty), expectXmlEmpty);
      chai.assert.deepEqual(Translator.getFields(
        xmlOneField), expectXmlOneField);
      chai.assert.deepEqual(Translator.getFields(
          xmlThreeFields),
        expectXmlThreeFields);
    });

    it('verifiySchema(String)', function() {
      let xmlValid =
        '<document><content><text bold="true">Hello' +
        '</text></content></document>';
      let xmlInvalid =
        '<text bold="true">Hello</text></content>';

      chai.assert.isTrue(Translator.verifiySchema(
        xmlValid));
      chai.assert.isFalse(Translator.verifiySchema(
        xmlInvalid));
    });
  });

  describe('Main method', function() {

    it('translate(String, Object)', function() {
      let xml =
        '<document><content><text bold="true">Hello' +
        '</text></content></document>';
      let expect = {
        'template': {
          'document': {
            'content': {
              'text': {
                '@text': 'Hello',
                '@': ['bold'],
                'bold': 'true'
              }
            }
          }
        },
        'fields': []
      };

      chai.assert.deepEqual(Translator.translate(xml, {
        sid: 'server',
        mid: 0
      }), expect);
    });

  });

});
