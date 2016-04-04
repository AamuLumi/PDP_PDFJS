import ADMZip from 'adm-zip';
import parser from 'xml2js';
import Future from 'fibers/future';

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
 * An TranslateDOCX object is returned by TranslateDOCX module
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
 * @returns {Buffer}      the readed document.xml file
 */
TranslateDOCX.prototype.getDocument = function(data) {
  let zip = new ADMZip(data);
  return zip.readFile('word/document.xml');
};

/**
 * @summary Check if an object is empty
 * @method isEmptyObject
 * @memberOf TranslateDOCX
 * @param  {obj} Object - the object to check
 * @returns {Boolean}    true if empty
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
 * @returns {String}          an available color
 */
TranslateDOCX.prototype.getColorFor = function(strColor) {
  // Transforms string to hexadecimals numbers to facilitate calculation
  let r = parseInt('0x' + strColor.substring(0, 2));
  let g = parseInt('0x' + strColor.substring(2, 4));
  let b = parseInt('0x' + strColor.substring(4, 6));
  let mid = 0x80;

  // Check what is the nearest color
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
 * @param  {strFontSize} String - the DOCX font size
 * @returns {String}             the real font size
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
 * @returns {String}         an available font
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
 * @returns {Object}     the JSON object who represents the line
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
 * @param  {String} propertyName   - the name of the property
 * @param  {String} propertyValue  - the value of the property
 */
TranslateDOCX.prototype.addProperty = function(object, objectTag,
  propertyName, propertyValue) {
  // If object don't contain objectTag, create it
  if (object[objectTag] === undefined)
    object[objectTag] = {};

  // Add the property to the tag
  // If a property already has been set, ['@'] isn't empty
  if (object[objectTag]['@'] !== undefined)
    object[objectTag]['@'].push(propertyName);
  else // Else no property has been added
    object[objectTag]['@'] = [propertyName];

  // Add the value
  object[objectTag][propertyName] = propertyValue;
};

/**
 * @summary Create a 'table' element from a 'w:tbl' DOCX element
 * @method getArrayFor
 * @memberOf TranslateDOCX
 * @param  {Object} array - the 'w:tbl' element to analyze
 * @returns {Object}      the 'table' element
 */
TranslateDOCX.prototype.getArrayFor = function(array) {
  let res = {
    'table': {}
  };
  let currentRow = [];
  let currentContent = null;

  // For each row
  for (let row of array['w:tr']) {
    currentContent = [];
    // For each column
    for (let cell of row['w:tc']) {
      // Analyze the cell as a element
      // It allow to create nested and complex tables
      currentContent.push(this.analyzeElement(cell));
    }

    // Push cell value
    currentRow.push({
      'content': currentContent
    });
  }

  res.table = {
    'row': currentRow
  };

  return res;
};

/**
 * @summary Check if an element is a field
 * @method runIsField
 * @memberOf TranslateDOCX
 * @param  {Object} run - the run to check
 * @returns {Boolean} - true if run is a field
 */
TranslateDOCX.prototype.runIsField = function(run) {
  if (!run['w:rPr']['w:highlight'] && !run['w:rPr']['w:shd'])
    return false;
  // Word field style
  else if (run['w:rPr']['w:highlight'] && run['w:rPr'][
      'w:highlight'
    ]['@']['w:val'] === 'lightGray')
    return true;
  // Google Docs field style
  else if (run['w:rPr']['w:shd'] && run['w:rPr']['w:shd']['@']
    ['w:fill'] === 'cccccc')
    return true;

  return false;
};

/**
 * @summary Compute a field element
 * WARNING : Field element returned is for document.
 * The method add a completed field element in global variable fields.
 * @method extractField
 * @memberOf TranslateDOCX
 * @param  {Object} current - the current element computed by getTextFor
 * @returns {Object} - a field element to add to template
 */
TranslateDOCX.prototype.extractField = function(current){
  let fieldObject = {
    'type': 'text'
  };

  // If current.text is an object, some properties are defined
  if (typeof current.text === 'object') {
    // So we must copy them to the field element to keep them
    for (let k in current.text)
      // Check if is a custom property (= property we have fixed)
      if (current.text.hasOwnProperty(k)) {
        // If this is the text element
        if (k === '@text')
          fieldObject.default = current.text[k];
        // Else this is a property
        else if (k !== '@')
          fieldObject[k] = current.text[k];
      }
  } // Else current have only text
  else
    fieldObject.text = current.text;

  // Get options
  let fieldOptions = fieldObject.default.split('!');
  let isEmptyField = false;

  // Set undefined to the default value
  fieldObject.default = undefined;

  // Read options
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

  // If empty has been set, remove values from default
  if (isEmptyField) {
    fieldObject.default = undefined;
  }

  // Push element to the global variable fields
  fields.push(fieldObject);

  // Return a document element
  return {
    'field': ''
  };
};

/**
 * @summary Create a 'text' element from a 'w:p' DOCX element
 * @method getTextFor
 * @memberOf TranslateDOCX
 * @param  {Object} textArray - the 'w:p' element to analyze
 * @returns {Object|Array} - the 'text' element
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

        // Check if there's a font color
        if (el['w:rPr']['w:color'])
          this.addProperty(current, 'text', 'fontColor',
            this.getColorFor(el['w:rPr']['w:color']['@'][
              'w:val'
            ])
          );

        // Check if there's a font size
        if (el['w:rPr']['w:sz'])
          this.addProperty(current, 'text', 'fontSize',
            this.getFontSizeFor(el['w:rPr']['w:sz']['@'][
              'w:val'
            ])
          );

        // Check if there's a font
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

      // If element is text
      if (current && !isField) res.push(current);
      // Else if is a field -> extract the field datas
      else if (current && isField) {
        res.push(this.extractField(current));
      }
    }
  }

  // If only one element in res array, return the element
  // It avoids to call for()->merge in analyzeElement
  if (res.length === 1) return res[0];

  return res;
};

/**
 * @summary Analyze a 'w:p' element
 * @method analyzeParagraph
 * @memberOf TranslateDOCX
 * @param  {Object} p - the 'w:p' element to analyze
 * @returns {Object}   the corresponding template element
 */
TranslateDOCX.prototype.analyzeParagraph = function(p) {
  // Check if paragraph is an horizontal line
  if (p['w:pPr'] && p['w:pPr']['w:pBdr'] &&
    p['w:pPr']['w:pBdr']['w:top'] &&
    !p['w:r'])
    return this.getHorizontalLine(p['w:pPr']['w:pBdr']['w:top']
      ['w:sz']);

  // Else, return an analyze of the run
  if (p['w:r']) {
    return this.getTextFor(p);
  }
};

/**
 * @summary Analyze elements from a DOCX element
 * @method analyzeElement
 * @memberOf TranslateDOCX
 * @param  {Object} data - the element to analyze
 * @returns {Object}      the corresponding template element
 */
TranslateDOCX.prototype.analyzeElement = function(data) {
  let res = [];

  // For each child of element
  for (let p of data['@@']) {
    // If is paragraph
    if (p['#name'] === 'w:p') {
      let pAnalyzed = this.analyzeParagraph(p);

      // analyzeParagraph can returns array
      // If is an array, merge results in res array
      if (this.isArray(pAnalyzed)) {
        for (let e of pAnalyzed)
          res.push(e);
      } else if (pAnalyzed && !this.isEmptyObject(pAnalyzed))
        res.push(pAnalyzed);
    } // Else if table
    else if (p['#name'] === 'w:tbl')
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
 * @returns {Object}     the template
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
 * @param  {Object} data - the DOCX filename
 * @returns {Object}      a JSON template & fields
 */
TranslateDOCX.prototype.translate = function(data) {
  console.log('Starting DOCX translating ..');

  // Extract document from DOCX
  let fileString = this.getDocument(data);

  // Create Future to transforms async call to sync call
  let future = new Future();
  fields = [];

  // Parse XML to JSON
  parser.parseString(fileString, {
    attrkey: '@',
    explicitArray: false,
    explicitChildren: true,
    preserveChildrenOrder: true,
    childkey: '@@'
  }, Meteor.bindEnvironment((err, dataJSON) => {
    // Compute template
    let template = this.createTemplateFrom(dataJSON);

    console.log('DOCX Translation : OK');

    return future.return({
      template: template,
      fields: fields
    });
  }));

  return future.wait();
};

export default new TranslateDOCX();
