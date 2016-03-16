let ADMZip = Meteor.npmRequire('adm-zip');
let fs = Meteor.npmRequire('fs');
let nodexml = Meteor.npmRequire('nodexml');

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

TranslateDOCX.prototype.addProperty = function (object, objectTag, propertyName,
  propertyValue) {
  if (object[objectTag] === undefined)
    object[objectTag] = {};

  if (object[objectTag]['@'] !== undefined)
    object[objectTag]['@'].push(propertyName);
  else
    object[objectTag]['@'] = [propertyName];

  object[objectTag][propertyName] = propertyValue;
};

TranslateDOCX.prototype.analyzeParagraph = function (p) {
  let res = {};
  let current = null;

  if (p['w:pPr'] && p['w:pPr']['w:pBdr'] && p['w:pPr']['w:pBdr']['w:top']
    && !p['w:r'])
    return this.getHorizontalLine(p['w:pPr']['w:pBdr']['w:top']['w:sz']);

    if (p['w:r']) {
      current = p['w:r'];

      // Get run properties
      if (current['w:rPr']) {
        if (current['w:rPr']['w:color'])
          this.addProperty(res, 'text', 'fontColor',
            this.getColorFor(current['w:rPr']['w:color']['w:val']));

        if (current['w:rPr']['w:sz'])
          this.addProperty(res, 'text', 'fontSize',
            this.getFontSizeFor(current['w:rPr']['w:sz']['w:val']));

        if (current['w:rPr']['w:rFonts'])
          this.addProperty(res, 'text', 'font',
            this.getFontFor(current['w:rPr']['w:rFonts']['w:ascii']));
      }

      // Get text
      if (current['w:t'])
        if (res.text)
          res.text['@text'] = p['w:r']['w:t']['@text'];
        else {
          res.text = p['w:r']['w:t']['@text'];
        }
    }

  return res;
};

TranslateDOCX.prototype.createTemplateFrom = function (data) {
  let template = {
    'document': {}
  };
  let tDocument = template.document;
  tDocument.content = [];
  let body = data['w:document']['w:body'];

  // Pour chaque paragraphe du document
  for (let p of body['w:p']) {
    let pAnalyzed = this.analyzeParagraph(p);

    if (!this.isEmptyObject(pAnalyzed)) tDocument.content.push(
      pAnalyzed);
  }

  return template;
};

TranslateDOCX.prototype.translate = function (data){
  console.log('Starting DOCX translating ..');

  let fileString = this.getDocument(data);
  let dataJSON = nodexml.xml2obj(fileString);
  let template = this.createTemplateFrom(dataJSON);

  console.log('Translating finished');

  return {
    template : template,
    fields : null
  };
};

Meteor.myFunctions.translateDOCX = new TranslateDOCX();
