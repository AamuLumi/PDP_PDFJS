let xml2json = Meteor.npmRequire("simple-xml2json");
let xmlvalidator = Meteor.npmRequire("xsd-schema-validator");

let translate_XML = function() {
    this.schema = "../web.browser/app/template_example.xsd";
	this.fieldName = 'field';
};

translate_XML.prototype.translate = function(data) {

    this.verifiySchema(data);
    console.log("Starting..");

};

translate_XML.prototype.toJSON = function(data) {

    let template = xml2json.parser(data);
    console.log(JSON.stringify(template));
    let fields = this.getObject(template);
    console.log(JSON.stringify(fields));
    return {
        template: template,
        fields: fields
    };
};

translate_XML.prototype.getObject = function(data) {

    let result = [];

    for (let prop in data) {

        if (prop == this.fieldName) {
            result = result.concat(data[prop]);
        } else if (data[prop] instanceof Object) {

            let resultTemp = this.getObject(data[prop]);

            if (resultTemp) {
                result = result.concat(resultTemp);
            }
        }
    }

    return result;
}

translate_XML.prototype.verifiySchema = function(data) {

    return xmlvalidator.validateXML(data, this.schema, function(err, result) {

        console.log(result);

        if (err) {
            console.log(err);
        } else {

            Meteor.myFunctions.translate_XML.toJSON(data);
        }

    });
};


Meteor.myFunctions.translate_XML = new translate_XML();
