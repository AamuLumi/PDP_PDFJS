/**
 * Unit tests for the XML Translator module
 */

import Translator from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';
Translator.msObject = {sid:'server_Hide', mid:0};

describe('XML Translator', function() {

  describe('Tools methods', function() {

    it('toJSON(String)', function() {
      let xml = '<content><text bold="true">Hello</text></content>';
      let expect = {"template":{"content":{"text":{"@text":"Hello","@":["bold"],"bold":"true"}}},"fields":[]};

      chai.assert.deepEqual(Translator.toJSON(xml), expect);
    });

   it('getFields(String)', function() {
     let xml_empty = {"content":""};
     let xml_one_field = {"content":{"field":{"@":["type"],"type":"date"}}};
     let xml_three_fields = {"content":{"field":[{"@":["type"],"type":"number"},{"@":["type"],"type":"date"},{"@":["type","default"],"type":"text","default":""}]}};

     let expect_xml_empty = [];
     let expect_xml_one_field = [{"@":["type"],"type":"date"}];
     let expect_xml_three_fields = [{"@":["type"],"type":"number"},{"@":["type"],"type":"date"},{"@":["type","default"],"type":"text","default":""}];

     chai.assert.deepEqual(Translator.getFields(xml_empty), expect_xml_empty);
     chai.assert.deepEqual(Translator.getFields(xml_one_field), expect_xml_one_field);
     chai.assert.deepEqual(Translator.getFields(xml_three_fields), expect_xml_three_fields);
    });

    it('verifiySchema(String)', function() {
      let xml_valid = '<document><content><text bold="true">Hello</text></content></document>';
      let xml_invalid = '<text bold="true">Hello</text></content>';

      chai.assert.isTrue(Translator.verifiySchema(xml_valid));
      chai.assert.isFalse(Translator.verifiySchema(xml_invalid));
    });
  });

  describe('Main method', function() {

    it('translate(String, Object)', function() {
      let xml = '<content><text bold="true">Hello</text></content>';
      let expect = {"template":{"content":{"text":{"@text":"Hello","@":["bold"],"bold":"true"}}},"fields":[]};

      chai.assert.deepEqual(Translator.translate(xml, {sid:'server', mid:0}), expect);
    });

  });

});
