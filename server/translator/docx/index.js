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

let TranslateDOCX = function() {
  fields = [];
};
/**
 * Get document.xml file contained in a .docx file
 * @param  {String} data - DOCX filename
 * @return {Buffer}      the readed document.xml file
 */
TranslateDOCX.prototype.getDocument = function(data) {
  let zip = new ADMZip(data);
  return zip.readFile('word/document.xml');
};

/**
 * Check if an object is empty
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
 * Return an XML avalaible color
 * @param  {String} strColor - the color in hexadecimal
 * @return {String}          an available color
 */
TranslateDOCX.prototype.getColorFor = function(strColor) {
  if (strColor === 'ff0000')
    return 'red';
  else if (strColor === '00ff00')
    return 'blue';
  else if (strColor === '0000ff')
    return 'green';

  return 'black';
};

/**
 * Return the real font size
 * DOCX fontSize are doubled (to be stock in integer)
 * @param  {String} strFontSize - the DOCX font size
 * @return {String}             the real font size
 */
TranslateDOCX.prototype.getFontSizeFor = function(strFontSize) {
  // Font in docx are doubled
  return (parseInt(strFontSize) / 2).toString();
};

/**
 * Return a avalaible font
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
 * Create a horizontal line with a specific width
 * @param  {String} width - the width of the line
 * @return {Object}       the JSON object who represents the line
 */
TranslateDOCX.prototype.getHorizontalLine = function(width) {
  let res = horizontalLine;

  res.line.width = width;

  return res;
};

/**
 * Add a property to an object
 * This function is used to add, for example, some new properties
 * 	to a text object.
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
 * Create a 'table' element from a 'w:tbl' DOCX element
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
 * Create a 'text' element from a 'w:p' DOCX element
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
          console.log('Field found');
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
                fieldObject.text = current.text[k];
              else if (k !== '@')
                fieldObject[k] = current.text[k];
            }
        } else
          fieldObject.text = current.text;


        if (fieldObject.text === 'empty') {
          res.push({
            'field': ''
          });
        } else {
          res.push({
            'field': fieldObject.text
          });
        }

        fieldObject.text = undefined;
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
 * Analyze a 'w:p' element
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
 * Analyze elements from a DOCX element
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
 * Create a template from a document.xml JSON
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
 * Translate a DOCX file to a JSON template & fields
 * @param  {String} data - the DOCX filename
 * @return {Object}      a JSON template & fields
 */
TranslateDOCX.prototype.translate = function(data) {
  console.log('Starting DOCX translating ..');

  let fileString = this.getDocument(data);
  let future = new Future();

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
