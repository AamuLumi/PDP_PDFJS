let fs = Meteor.npmRequire('fs');
let Future = Meteor.npmRequire('fibers/future');

let templateInterpreter = function() {};
	
templateInterpreter.prototype.templateToObject = function(textArray, templateId) {

	let template = Meteor.myFunctions.translate_XML.translate(this.getTemplate(templateId)).template;

	console.log(template);
	
	let fieldsData = [];
	
	for (let key in textArray) {
		fieldsData.push(textArray[key]);
  	}
	
	let dd = { content: []};
	
	dd.content = this.setPDFmakeObject(template.document.content, fieldsData);
	
	return dd;
	
};

templateInterpreter.prototype.getTemplate = function(templateId){
	
	let future = new Future();
	
	fs.readFile('../web.browser/app/template_base.xml', 'utf8', Meteor.bindEnvironment( function (err, data) {
		
	  if (err) {
		return console.log(err);
	  }
		
	  return future.return(data);
		
	}));

	return future.wait();
	
}

templateInterpreter.prototype.setPDFmakeObject = function(content, fieldsData){
	
	
	let result = [];
	
	for (var i=0; i < content.length; i++) {

		if (content[i] instanceof Array)
			return;
        else if ('text' in content[i]) 
           result.push(content[i].text);
        else if ('field' in content[i]) 
            result.push(fieldsData.shift());
		else if ('line' in content[i]){
			
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
			result.push({canvas : canvas});
			console.log(line);
			
		}
		else if ('table' in content[i]){
			
			let table = {};
			let body = [];
			for (var j=0; j < content[i].table.row.length; j++) {
				body.push(this.setPDFmakeObject(content[i].table.row[j].content, fieldsData));
			}
			table.body = body;
			result.push({table : table});
		}

		
		console.log(content[i]);
			
    }
	
	return result;

	
}


Meteor.myFunctions.templateInterpreter = new templateInterpreter();