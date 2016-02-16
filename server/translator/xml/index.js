let nodexml = Meteor.npmRequire("nodexml");
let xmlvalidator = Meteor.npmRequire("xsd-schema-validator");
let Future = Meteor.npmRequire('fibers/future');

//TODO: returns

let translate_XML = function() {
	
    this.schema = "../web.browser/app/template_example.xsd";
	this.fieldName = 'field';
};

/**
 * Validate the XML template against the XSD schema and
 * convert the XML template in two JSON object, the template and the fields
 * @param {data} XML template
 */
translate_XML.prototype.translate = function(data) {

	console.log("Starting..");
	
    if (this.verifiySchema(data)){
    	return this.toJSON(data);
	}	
	
	return;

};

/**
 * Convert the XML template in two JSON object, the template and the fields
 * @param {data} XML template
 */
translate_XML.prototype.toJSON = function(data) {

    let template = nodexml.xml2obj(data);
    console.log(JSON.stringify(template));
    let fields = this.getFields(template);
    console.log(JSON.stringify(fields));
    return {
        template: template,
        fields: fields
    };
};

/**
 * Extract fields from the XML template
 * @param {data} XML template
 */
translate_XML.prototype.getFields = function(data) {

    let result = [];

    for (let prop in data) {

        if (prop == this.fieldName) {
            result = result.concat(data[prop]);
        } else if (data[prop] instanceof Object) {

            let resultTemp = this.getFields(data[prop]);

            if (resultTemp) {
                result = result.concat(resultTemp);
            }
        }
    }

    return result;
}

/**
 * Validate the XML template against the XSD schema
 * @param {data} XML template
 */
translate_XML.prototype.verifiySchema = function(data) {
	
	let future = new Future();

    xmlvalidator.validateXML(data, this.schema, function(err, result) {

        console.log(result);

        if (err) {
			console.log(err);
			return future.return(false);
		}
		else 
            return future.return(true);

    });
	
	return future.wait();
};


Meteor.myFunctions.translate_XML = new translate_XML();
