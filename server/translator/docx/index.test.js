/**
 * Unit tests for the DOCX Translator module
 */

import Translator from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';

describe('DOCX Translator', function() {
  describe('Tools methods', function() {
    it('isEmptyObject(Object)', function() {
      chai.assert.equal(Translator.isEmptyObject({}), true);
      chai.assert.equal(Translator.isEmptyObject({
          'myKey': 2
        }), false);
    });
  });
});
