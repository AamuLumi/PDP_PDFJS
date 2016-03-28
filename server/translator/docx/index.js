let ADMZip = Meteor.npmRequire('adm-zip');
let fs = Meteor.npmRequire('fs');
let parser = Meteor.npmRequire('xml2js');
let Future = Meteor.npmRequire('fibers/future');

let STR_NOT_FOUND = -1;

let fields = [];

let horizontalLine = {
  'line': {
    '@': [
      'x1',
      'x2',
      'y1',
      'y2',
      'width'
    ],
    'x1': '10',
    'x2': '400',
    'y1': '10',
    'y2': '10',
    'width': '1'
  }
};


/**
 * @summary Constructor for the DOCX translator
 * An TranslateDOCX object is returned by Meteor.myFunctions.TranslateDOCX
 * @instancename TranslateDOCX
 * @class
*/
let TranslateDOCX = function() {

};
/**
 * @summary Get document.xml file contained in a .docx file
 * @method getDocument
 * @memberOf TranslateDOCX
 * @param  {String} data - DOCX filename
 * @return {Buffer}      the readed document.xml file
 */
TranslateDOCX.prototype.getDocument = function(data) {
  let zip = new ADMZip(data);
  return zip.readFile('word/document.xml');
};

/**
 * @summary Check if an object is empty
 * @method isEmptyObject
 * @memberOf TranslateDOCX
 * @param  {Object} obj - the object to check
 * @return {Boolean}    true if empty
 */
TranslateDOCX.prototype.isEmptyObject = function(obj) {
  return !Object.keys(obj).length;
};

TranslateDOCX.prototype.isArray = function(obj) {
  return Object.prototype.toString.call(obj) ===
    '[object Array]';
};

/**
 * @summary Return an XML avalaible color
 * @method getColorFor
 * @memberOf TranslateDOCX
 * @param  {String} strColor - the color in hexadecimal
 * @return {String}          an available color
 */
TranslateDOCX.prototype.getColorFor = function(strColor) {
  let r = parseInt('0x' + strColor.substring(0, 2));
  let g = parseInt('0x' + strColor.substring(2, 4));
  let b = parseInt('0x' + strColor.substring(4, 6));
  let mid = 0x80;

  if (r >= mid && g < mid && b < mid)
    return 'red';
  else if (r < mid && g < mid && b >= mid)
    return 'blue';
  else if (r < mid && g > mid && b < mid)
    return 'green';
  else if (r >= mid && g >= mid && b < mid)
    return 'yellow';

  return 'black';
};

/**
 * @summary Return the real font size.
 * DOCX fontSize are doubled (to be stock in integer)
 * @method getFontSizeFor
 * @memberOf TranslateDOCX
 * @param  {String} strFontSize - the DOCX font size
 * @return {String}             the real font size
 */
TranslateDOCX.prototype.getFontSizeFor = function(strFontSize) {
  // Font in docx are doubled
  return (parseInt(strFontSize) / 2).toString();
};

/**
 * @summary Return a avalaible font
 * @method getFontFor
 * @memberOf TranslateDOCX
 * @param  {String} strFont - the name of the font
 * @return {String}         an available font
 */
TranslateDOCX.prototype.getFontFor = function(strFont) {
  if (strFont.indexOf('Helvetica') > STR_NOT_FOUND)
    return 'helvetica';
  else if (strFont.indexOf('Courier') > STR_NOT_FOUND)
    return 'courier';

  return 'arial';
};

/**
 * @summary Create a horizontal line with a specific width
 * @method getHorizontalLine
 * @memberOf TranslateDOCX
 * @param  {String} width - the width of the line
 * @return {Object}       the JSON object who represents the line
 */
TranslateDOCX.prototype.getHorizontalLine = function(width) {
  let res = horizontalLine;

  res.line.width = width;

  return res;
};

/**
 * @summary Add a property to an object.
 * This function is used to add, for example, some new properties
 * 	to a text object.
 * @method addProperty
 * @memberOf TranslateDOCX
 * @param  {Object} object        - the base object to manipulate
 * @param  {String} objectTag     - the tag where property must be added
 * @param  {String} propertyName  - the name of the property
 * @param  {Object} propertyValue - the value of the property
 */
TranslateDOCX.prototype.addProperty = function(object, objectTag,
  propertyName, propertyValue) {
  if (object[objectTag] === undefined)
    object[objectTag] = {};

  if (object[objectTag]['@'] !== undefined)
    object[objectTag]['@'].push(propertyName);
  else
    object[objectTag]['@'] = [propertyName];

  object[objectTag][propertyName] = propertyValue;
};

/**
 * @summary Create a 'table' element from a 'w:tbl' DOCX element
 * @method getArrayFor
 * @memberOf TranslateDOCX
 * @param  {Object} array - the 'w:tbl' element to analyze
 * @return {Object}       the 'table' element
 */
TranslateDOCX.prototype.getArrayFor = function(array) {
  let res = {
    'table': {}
  };
  let currentRow = [];
  let currentContent = null;

  for (let row of array['w:tr']) {
    currentContent = [];
    for (let cell of row['w:tc']) {
      currentContent.push(this.analyzeElement(cell));
    }

    currentRow.push({
      'content': currentContent
    });
  }

  res.table = {
    'row': currentRow
  };

  return res;
};

TranslateDOCX.prototype.runIsField = function(run) {
  if (!run['w:rPr']['w:highlight'] && !run['w:rPr']['w:shd'])
    return false;
  else if (run['w:rPr']['w:highlight'] && run['w:rPr'][
      'w:highlight'
    ]['@']['w:val'] === 'lightGray')
    return true;
  else if (run['w:rPr']['w:shd'] && run['w:rPr']['w:shd']['@']
    ['w:fill'] === 'cccccc')
    return true;

  return false;
};

/**
 * @summary Create a 'text' element from a 'w:p' DOCX element
 * @method getTextFor
 * @memberOf TranslateDOCX
 * @param  {Object} textArray - the 'w:p' element to analyze
 * @return {Object|Array}           - the 'text' element
 */
TranslateDOCX.prototype.getTextFor = function(textArray) {
  let res = [];
  let current = null;
  let isField = false;

  // We search every run of the paragraph
  for (let el of textArray['@@']) {
    if (el['#name'] === 'w:r') {
      current = {};

      // Get run properties
      if (el['w:rPr']) {
        // Check if this run is a field
        if (this.runIsField(el)) {
          isField = true;
        }

        if (el['w:rPr']['w:color'])
          this.addProperty(current, 'text', 'fontColor',
            this.getColorFor(el['w:rPr']['w:color']['@'][
              'w:val'
            ])
          );

        if (el['w:rPr']['w:sz'])
          this.addProperty(current, 'text', 'fontSize',
            this.getFontSizeFor(el['w:rPr']['w:sz']['@'][
              'w:val'
            ])
          );

        if (el['w:rPr']['w:rFonts'])
          this.addProperty(current, 'text', 'font',
            this.getFontFor(el['w:rPr']['w:rFonts']['@'][
              'w:ascii'
            ]));
      }

      // Get text
      if (el['w:t'] && el['w:t']._) {
        // Sometimes, text is contained in field ['_']
        if (current.text) {
          current.text['@text'] = el['w:t']._;
        } else {
          current.text = el['w:t']._;
        }
      } else if (el['w:t'] && (typeof el['w:t'] !== 'object')) {
        // Sometimes, it's contained in the classic ['w:t']
        //  but it may not contains text. So we need to check
        //  if the ['w:t'] element isn't an object.
        if (current.text) {
          current.text['@text'] = el['w:t'];
        } else {
          current.text = el['w:t'];
        }
      } else {
        current = undefined;
      }

      if (current && !isField) res.push(current);
      else if (current && isField) {
        let fieldObject = {
          'type': 'text'
        };

        if (typeof current.text === 'object') {
          for (let k in current.text)
            if (current.text.hasOwnProperty(k)) {
              if (k === '@text')
                fieldObject.default = current.text[k];
              else if (k !== '@')
                fieldObject[k] = current.text[k];
            }
        } else
          fieldObject.text = current.text;

        let fieldOptions = fieldObject.default.split('!');
        let isEmptyField = false;
        fieldObject.default = undefined;

        for (let opt of fieldOptions) {
          if (opt === '$n')
            fieldObject.type = 'number';
          else if (opt === '$d')
            fieldObject.type = 'date';
          else if (opt === '$empty')
            isEmptyField = true;
          else
            fieldObject.default = opt;
        }


        if (isEmptyField) {
          fieldObject.default = undefined;
        }

        res.push({
          'field': ''
        });

        fields.push(fieldObject);
      }
    }
  }

  if (res.length === 1) return res[0];
  else if (res.length > 1) {
    // // We concatenate nested strings, because Word separates them.
    // let tmp = '';
    //
    // let finalRes = [];
    //
    // for (let i = 0; i < res.length; i++){
    //   if (res[i].text && res[i].text['@text']) tmp += res[i].text['@text'];
    //   else if (res[i].text) tmp += res[i].text;
    // }
    //
    // if (res[0].text['@text']) res[0].text['@text'] += tmp;
    // else res[0].text += tmp;

    return res;
  }

  return res;
};

/**
 * @summary Analyze a 'w:p' element
 * @method analyzeParagraph
 * @memberOf TranslateDOCX
 * @param  {Object} p - the 'w:p' element to analyze
 * @return {Object}   the corresponding template element
 */
TranslateDOCX.prototype.analyzeParagraph = function(p) {
  if (p['w:pPr'] && p['w:pPr']['w:pBdr'] &&
    p['w:pPr']['w:pBdr']['w:top'] &&
    !p['w:r'])
    return this.getHorizontalLine(p['w:pPr']['w:pBdr']['w:top']
      ['w:sz']);

  if (p['w:r']) {
    return this.getTextFor(p);
  }
};

/**
 * @summary Analyze elements from a DOCX element
 * @method analyzeElement
 * @memberOf TranslateDOCX
 * @param  {Object} data - the element to analyze
 * @return {Object}      the corresponding template element
 */
TranslateDOCX.prototype.analyzeElement = function(data) {
  let res = [];

  for (let p of data['@@']) {
    if (p['#name'] === 'w:p') {
      let pAnalyzed = this.analyzeParagraph(p);

      if (this.isArray(pAnalyzed)) {
        for (let e of pAnalyzed)
          res.push(e);
      } else if (pAnalyzed && !this.isEmptyObject(pAnalyzed))
        res.push(
          pAnalyzed);
    } else if (p['#name'] === 'w:tbl')
      res.push(this.getArrayFor(p));
  }

  if (res.length === 1) return res[0];

  return res;
};

/**
 * @summary Create a template from a document.xml JSON
 * @method createTemplateFrom
 * @memberOf TranslateDOCX
 * @param  {Object} data - the JSON to analyze
 * @return {Object}      the template
 */
TranslateDOCX.prototype.createTemplateFrom = function(data) {
  let template = {
    'document': {}
  };
  let tDocument = template.document;

  tDocument.content = this.analyzeElement(data['w:document'][
    'w:body'
  ]);

  return template;
};

/**
 * @summary Translate a DOCX file to a JSON template & fields
 * @method translate
 * @memberOf TranslateDOCX
 * @param  {String} data - the DOCX filename
 * @return {Object}      a JSON template & fields
 */
TranslateDOCX.prototype.translate = function(data) {
  console.log('Starting DOCX translating ..');

  let fileString = this.getDocument(data);
  let future = new Future();
  fields = [];

  parser.parseString(fileString, {
    attrkey: '@',
    explicitArray: false,
    explicitChildren: true,
    preserveChildrenOrder: true,
    childkey: '@@'
  }, Meteor.bindEnvironment((err, dataJSON) => {
    fs.writeFileSync('./text.json', JSON.stringify(
      dataJSON));
    let template = this.createTemplateFrom(dataJSON);

    console.log('DOCX Translation : OK ..');

    return future.return({
      template: template,
      fields: fields
    });
  }));

  return future.wait();
};

Meteor.myFunctions.translateDOCX = new TranslateDOCX();
