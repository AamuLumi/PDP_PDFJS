/**
 * Unit tests for the DOCX Translator module
 */

import Translator from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';

let runTest = {
  '#name': 'w:r',
  '@@': [{
    '#name': 'w:rPr',
    '@@': [{
      '#name': 'w:rPr',
      '@@': [{
        '@': {
          'w:val': '18'
        },
        '#name': 'w:sz'
      }],
      'w:sz': {
        '@': {
          'w:val': '18'
        }
      }
    }, {
      '_': 'Texte de test',
      '#name': 'w:t'
    }]
  }],
  'w:rPr': {
    'w:sz': {
      '@': {
        'w:val': '18'
      }
    }
  },
  'w:t': {
    '_': 'Texte de test',
    '#name': 'w:t'
  }
};

let wordFieldTest = {
  '#name': 'w:r',
  '@@': [{
    '#name': 'w:rPr',
    '@@': [{
      '#name': 'w:rPr',
      '@@': [{
        '@': {
          'w:val': '18'
        },
        '#name': 'w:sz'
      }],
      'w:sz': {
        '@': {
          'w:val': '18'
        }
      },
      'w:highlight': {
        '@': {
          'w:val': 'lightGray'
        }
      }
    }, {
      '_': 'Texte de test',
      '#name': 'w:t'
    }]
  }],
  'w:rPr': {
    'w:sz': {
      '@': {
        'w:val': '18'
      }
    },
    'w:highlight': {
      '@': {
        'w:val': 'lightGray'
      }
    }
  },
  'w:t': {
    '_': '!$d!$empty',
    '#name': 'w:t'
  }
};

let googleFieldTest = {
  '#name': 'w:r',
  '@@': [{
    '#name': 'w:rPr',
    '@@': [{
      '#name': 'w:rPr',
      '@@': [{
        '@': {
          'w:val': '18'
        },
        '#name': 'w:sz'
      }],
      'w:sz': {
        '@': {
          'w:val': '18'
        }
      },
      'w:shd': {
        '@': {
          'w:fill': 'cccccc'
        }
      }
    }, {
      '_': 'Texte de test',
      '#name': 'w:t'
    }]
  }],
  'w:rPr': {
    'w:sz': {
      '@': {
        'w:val': '18'
      }
    },
    'w:shd': {
      '@': {
        'w:fill': 'cccccc'
      }
    }
  },
  'w:t': {
    '_': '!$n!42',
    '#name': 'w:t'
  }
};

let paragraphTest = {
  '#name': 'w:p',
  'w:r': runTest,
  '@@': [runTest]
};

let lineParagraphTest = {
  '#name': 'w:p',
  'w:pPr': {
    'w:pBdr': {
      'w:top': {
        'w:sz': '5'
      }
    }
  }
};

let array = {
  '#name': 'w:tbl',
  'w:tr': [{
    'w:tc': [{
      '@@': [paragraphTest]
    }, {
      '@@': [paragraphTest]
    }]
  }, {
    'w:tc': [{
      '@@': [paragraphTest]
    }, {
      '@@': [paragraphTest]
    }]
  }]
};

let body = {
  '@@': [lineParagraphTest, paragraphTest, array]
};

let document = {
  'w:document': {
    'w:body': body
  }
};


describe('DOCX Translator', function() {
  describe('Extraction methods', function() {
    it('getDocument(String)', function() {
      chai.assert.equal(Translator.getDocument(
        undefined), undefined);
    });
  });
  describe('Tools methods', function() {
    it('isEmptyObject(Object)', function() {
      chai.assert.equal(Translator.isEmptyObject({}),
        true);
      chai.assert.equal(Translator.isEmptyObject({
        'myKey': 2
      }), false);
    });
    it('isArray(Object)', function() {
      chai.assert.equal(Translator.isArray([]),
        true);
      chai.assert.equal(Translator.isArray({
        'myKey': 2
      }), false);
    });
    it('getColorFor(String)', function() {
      chai.assert.equal(Translator.getColorFor(
        '000000'), 'black');
      chai.assert.equal(Translator.getColorFor(
        'FF0000'), 'red');
      chai.assert.equal(Translator.getColorFor(
        '00FF00'), 'green');
      chai.assert.equal(Translator.getColorFor(
        '0000FF'), 'blue');
      chai.assert.equal(Translator.getColorFor(
        'FFFF00'), 'yellow');
      chai.assert.equal(Translator.getColorFor(
        'FFFFFF'), 'black');
    });
    it('getFontSizeFor(String)', function() {
      chai.assert.equal(Translator.getFontSizeFor(
        '16'), '8');
      chai.assert.equal(Translator.getFontSizeFor(
        '24'), '12');
    });
    it('getFontFor(String)', function() {
      chai.assert.equal(Translator.getFontFor(
        'Arial'), 'arial');
      chai.assert.equal(Translator.getFontFor(
        'Helvetica'), 'helvetica');
      chai.assert.equal(Translator.getFontFor(
        'Courier New'), 'courier');
      chai.assert.equal(Translator.getFontFor(
        'Roboto'), 'arial');
    });
    it('addProperty(Object, String, String, String)',
      function() {
        let object = {};
        Translator.addProperty(object, 'keyTest',
          'propertyTest', 'propertyValue');

        chai.assert.notEqual(object.keyTest, undefined);
        chai.assert.notEqual(object.keyTest.propertyTest,
          undefined);
        chai.assert.equal(object.keyTest.propertyTest,
          'propertyValue');
      });
  });
  describe('Analysis methods', function() {
    it('getHorizontalLine(String)', function() {
      let line = Translator.getHorizontalLine('5');

      chai.assert.equal(Object.keys(line)[0], 'line');
      chai.assert.equal(line.line.width, '5');
    });
    it('runIsField(Object)',
      function() {
        chai.assert.equal(Translator.runIsField(
          runTest), false);
        chai.assert.equal(Translator.runIsField(
          wordFieldTest), true);
        chai.assert.equal(Translator.runIsField(
          googleFieldTest), true);
      });
    it('getArrayFor(Object)',
      function() {
        let table = Translator.getArrayFor(array);

        chai.assert.notEqual(table.table.row,
          undefined);
        chai.assert.equal(table.table.row.length, 2);
        chai.assert.equal(table.table.row[0].content.length,
          2);
        chai.assert.equal(table.table.row[0].content[0]
          .text['@text'], 'Texte de test');
        chai.assert.equal(table.table.row[1].content[1]
          .text['@text'], 'Texte de test');
      });
    it('getTextFor(Object)',
      function() {
        let text = Translator.getTextFor(paragraphTest);

        chai.assert.notEqual(text.text,
          undefined);
        chai.assert.equal(text.text['@text'],
          'Texte de test');
        chai.assert.equal(text.text.fontSize,
          '9');
        chai.assert.equal(text.text['@'][0],
          'fontSize');

        let wordField = Translator.getTextFor({
          '#name': 'w:p',
          'w:r': wordFieldTest,
          '@@': [wordFieldTest]
        });
        chai.assert.equal(wordField.field, '');

        let googleField = Translator.getTextFor({
          '#name': 'w:p',
          'w:r': googleFieldTest,
          '@@': [googleFieldTest]
        });
        chai.assert.equal(googleField.field, '');
      });
    it('analyzeParagraph(Object)',
      function() {
        let text = Translator.analyzeParagraph(
          paragraphTest);

        chai.assert.notEqual(text.text,
          undefined);
        chai.assert.equal(text.text['@text'],
          'Texte de test');
        chai.assert.equal(text.text.fontSize,
          '9');
        chai.assert.equal(text.text['@'][0],
          'fontSize');

        let line = Translator.analyzeParagraph(
          lineParagraphTest);

        chai.assert.equal(Object.keys(line)[0], 'line');
        chai.assert.equal(line.line.width, '5');
      });
    it('analyzeElement(Object)',
      function() {
        let bodyTranslation = Translator.analyzeElement(
          body);

        chai.assert.notEqual(bodyTranslation,
          undefined);
        chai.assert.equal(bodyTranslation.length, 3);
        chai.assert.equal(Object.keys(bodyTranslation[
          0])[0], 'line');
        chai.assert.equal(bodyTranslation[0].line.width,
          '5');
        chai.assert.equal(Object.keys(bodyTranslation[
          1])[0], 'text');
        chai.assert.equal(bodyTranslation[1].text[
          '@text'], 'Texte de test');
        chai.assert.equal(Object.keys(bodyTranslation[
          2])[0], 'table');
        chai.assert.equal(bodyTranslation[2].table.row
          .length, 2);
      });
    it('createTemplateFrom(Object)',
      function() {
        let translation = Translator.createTemplateFrom(
          document);

        chai.assert.notEqual(translation.document,
          undefined);
        chai.assert.equal(translation.document.content
          .length, 3);
        chai.assert.equal(Object.keys(translation.document
          .content[0])[0], 'line');
        chai.assert.equal(translation.document.content[
          0].line.width, '5');
        chai.assert.equal(Object.keys(translation.document
          .content[1])[0], 'text');
        chai.assert.equal(translation.document.content[
          1].text['@text'], 'Texte de test');
        chai.assert.equal(Object.keys(translation.document
          .content[2])[0], 'table');
        chai.assert.equal(translation.document.content[
          2].table.row.length, 2);
      });
  });
});
