let fs = Meteor.npmRequire('fs');
let Future = Meteor.npmRequire('fibers/future');

/**
 * @summary Constructor for the Template Interpreter.
 * An TemplateInterpreter object is returned by Meteor.myFunctions.TemplateInterpreter
 * This class is used to covert a XML template to a JSON template.
 * @instancename TemplateInterpreter
 * @class
*/
let TemplateInterpreter = function() {};

/**
 * @summary Convert fields data and template to a pdfmake object with filled fields
 * @method templateToObject
 * @memberOf TemplateInterpreter
 * @param {String} formData text from form fields
 * @param {String} templateId id of the choosen template
 * @returns {Object} PDFMake object
 */
TemplateInterpreter.prototype.templateToObject = function(
  formData, templateName) {

  let template = this.getTemplate(templateName).content;


  let fieldsData = [];

  for (let key in formData) {
    fieldsData.push(formData[key]);
  }

  let tObject = {
    content: []
  };

  tObject.content = this.setPDFmakeObject(template.document.content,
    fieldsData);

  console.log(JSON.stringify(tObject));

  return tObject;

};

/**
 * @summary Get template from the collection Collections.Templates
 * @method getTemplate
 * @memberOf TemplateInterpreter
 * @param {String} templateId id of the choosen template
 * @returns {Object} Template from the collection
 */
TemplateInterpreter.prototype.getTemplate = function(templateName) {

  return Collections.Templates.findOne({
    title: templateName
  });

};

/**
 * Convert the JSON template en the fields data to a PDFMmake object
 * @method setPDFmakeObject
 * @memberOf TemplateInterpreter
 * @param {String} content JSON template
 * @param {String} fieldsData text from form fields
 * @return {Object} Object PDFMake object
 */
TemplateInterpreter.prototype.setPDFmakeObject = function(
  content, fieldsData) {
  let result = [];

  if (!Array.isArray(content))
    content = [content];

  for (let i = 0; i < content.length; i++) {
    if ('text' in content[i]) {
      if (typeof content[i].text === 'string' ||
        content[i].text instanceof String){
        result.push(content[i].text);
      } else {
        let text = {};
        if ('fontSize' in content[i].text){
          text.fontSize = parseInt(content[i].text.fontSize);
				}

        if ('fontColor' in content[i].text){
          text.color = content[i].text.fontColor;
				}

        if ('alignment' in content[i].text){
          text.alignment = content[i].text.alignment;
        }

        if ('italic' in content[i].text){
          if (content[i].text.italic == 'true')
            text.italic = true;
          else
            text.italic = false;
        }

        if ('bold' in content[i].text){
          if (content[i].text.bold == 'true')
            text.bold = true;
          else
            text.bold = false;
        }

        text.text = content[i].text['@text'];
        result.push(text);
      }
    } else if ('field' in content[i]) {
      let data = fieldsData.shift();
      if (data){
        result.push(data);
      } else {
        result.push(' ');
      }
    } else if ('line' in content[i]) {
      let object = content[i].line;
      let canvas = [];
      let line = {};

      line.type = 'line';
      line.x1 = parseInt(object.x1);
      line.y1 = parseInt(object.y1);
      line.x2 = parseInt(object.x2);
      line.y2 = parseInt(object.y2);
      line.lineWidth = parseInt(object.width);
      canvas.push(line);
      result.push({
        canvas: canvas
      });
    } else if ('table' in content[i]) {
      let table = {};
      let body = [];
      for (let j = 0; j < content[i].table.row.length; j++) {
        body.push(this.setPDFmakeObject(content[i].table.row[j]
          .content, fieldsData));
      }
      table.body = body;
      result.push({
        table: table
      });
    }

  }

  return result;
};


Meteor.myFunctions.TemplateInterpreter = new TemplateInterpreter();
