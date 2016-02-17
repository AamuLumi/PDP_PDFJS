let fs = Meteor.npmRequire('fs');
let Future = Meteor.npmRequire('fibers/future');

//TODO: returns

let templateInterpreter = function() {};

/**
 * Convert fields data and template to a pdfmake object
 * @param {textArray} text from form fields
 * @param {templateId} id of the choosen template
 */
templateInterpreter.prototype.templateToObject = function(
  textArray, templateId) {

  let template = Meteor.myFunctions.translateXML.translate(
    this.getTemplate(templateId)).template;

  // console.log(template);

  let fieldsData = [];

  for (let key in textArray) {
    fieldsData.push(textArray[key]);
  }

  let dd = {
    content: []
  };

  dd.content = this.setPDFmakeObject(template.document.content,
    fieldsData);

  return dd;

};

/**
 * Get template from the DB
 * @param {templateId} id of the choosen template
 */
templateInterpreter.prototype.getTemplate = function(templateId) {
  let future = new Future();

  fs.readFile('../web.browser/app/template_base.xml', 'utf8',
    Meteor.bindEnvironment(function(err, data) {
      if (err) {
        return console.log(err);
      }

      return future.return(data);
    }));

  return future.wait();
};

/**
 * Convert the JSON template en the fields data to a pdfmake object
 * @param {content} JSON template
 * @param {fieldsData} text from form fields
 */
templateInterpreter.prototype.setPDFmakeObject = function(
  content, fieldsData) {
  let result = [];

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


Meteor.myFunctions.templateInterpreter = new templateInterpreter();
