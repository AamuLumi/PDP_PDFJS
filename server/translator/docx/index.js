let ADMZip = Meteor.npmRequire('adm-zip');
let fs = Meteor.npmRequire('fs');
let parser = Meteor.npmRequire('xml2js');
let Future = Meteor.npmRequire('fibers/future');

let STR_NOT_FOUND = -1;

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

let TranslateDOCX = function(){

};

TranslateDOCX.prototype.getDocument = function (data) {
  let zip = new ADMZip(data);
  return zip.readFile('word/document.xml');
};

TranslateDOCX.prototype.isEmptyObject = function (obj) {
  return !Object.keys(obj).length;
};

TranslateDOCX.prototype.getColorFor = function (strColor) {
  if (strColor === 'ff0000')
    return 'red';
  else if (strColor === '00ff00')
    return 'blue';
  else if (strColor === '0000ff')
    return 'green';

  return 'black';
};

TranslateDOCX.prototype.getFontSizeFor = function (strFontSize){
  // Font in docx are doubled
  return (parseInt(strFontSize)/2).toString();
};

TranslateDOCX.prototype.getFontFor = function (strFont) {
  if (strFont.indexOf('Helvetica') > STR_NOT_FOUND)
    return 'helvetica';
  else if (strFont.indexOf('Courier') > STR_NOT_FOUND)
    return 'courier';

  return 'arial';
};

TranslateDOCX.prototype.getHorizontalLine = function (width) {
  let res = horizontalLine;

  res.line.width = width;

  return res;
};

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

  res.table = {'row' : currentRow};

  return res;
};

TranslateDOCX.prototype.getTextFor = function(textArray) {
  let res = {};

  // Get run properties
  if (textArray['w:rPr']) {
    if (textArray['w:rPr']['w:color'])
      this.addProperty(res, 'text', 'fontColor',
        this.getColorFor(textArray['w:rPr']['w:color']['@']['w:val'])
      );

    if (textArray['w:rPr']['w:sz'])
      this.addProperty(res, 'text', 'fontSize',
        this.getFontSizeFor(textArray['w:rPr']['w:sz']['@']['w:val'])
      );

    if (textArray['w:rPr']['w:rFonts'])
      this.addProperty(res, 'text', 'font',
        this.getFontFor(textArray['w:rPr']['w:rFonts']['@'][
          'w:ascii'
        ]));
  }

  // Get text
  if (textArray['w:t'])
    if (res.text) {
      res.text['@text'] = textArray['w:t'];
    } else {
      res.text = textArray['w:t'];
    }

  return res;
};

TranslateDOCX.prototype.analyzeParagraph = function(p) {
  let res = {};

  if (p['w:pPr'] && p['w:pPr']['w:pBdr'] && p['w:pPr'][
      'w:pBdr'
    ]['w:top'] && !p['w:r'])
    return this.getHorizontalLine(p['w:pPr']['w:pBdr']['w:top']
      ['w:sz']);

  if (p['w:r']) {
    return this.getTextFor(p['w:r']);
  }

  return res;
};

TranslateDOCX.prototype.analyzeElement = function(data){
  let res = [];

  for (let p of data['@@']) {
    if (p['#name'] === 'w:p') {
      let pAnalyzed = this.analyzeParagraph(p);

      if (!this.isEmptyObject(pAnalyzed)) res.push(
        pAnalyzed);
    }
    else if (p['#name'] === 'w:tbl')
      res.push(this.getArrayFor(p));
  }

  if (res.length === 1) return res[0];

  return res;
};

TranslateDOCX.prototype.createTemplateFrom = function(data) {
  let template = {
    'document': {}
  };
  let tDocument = template.document;

  tDocument.content = this.analyzeElement(data['w:document']['w:body']);

  return template;
};

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
      fields: null
    });
  }));

  return future.wait();
};

Meteor.myFunctions.translateDOCX = new TranslateDOCX();
