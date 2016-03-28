let nodexml = Meteor.npmRequire('nodexml');
let xmlvalidator = Meteor.npmRequire('libxml-xsd');
let Future = Meteor.npmRequire('fibers/future');
let sleep = Meteor.npmRequire('sleep');

/**
 * @summary Constructor for the XML translator
 * An TranslateXML object is returned by Meteor.myFunctions.TranslateXML
 * @instancename TranslateXML
 * @class
*/
let TranslateXML = function() {
  this.schema = '../web.browser/app/template_example.xsd';
  this.fieldName = 'field';
};

/**
 * @summary Validate the XML template against the XSD schema and
 * convert the XML template in two JSON object, the template and the fields
 * @method translate
 * @memberOf TranslateXML
 * @param {data} XML template
 * @returns {Object} Teplate Object
 * @returns {Object.template} Teplate in JSON format
 * @returns {Object.fields} Fields in JSON format
 */
TranslateXML.prototype.translate = function(data, msObject) {

  this.msObject = msObject;
  console.log('Starting XML translating ..');

  if (this.verifiySchema(data)) {
    return this.toJSON(data);
  }

  return;
};

/**
 * @summary Convert the XML template in two JSON object, the template and the fields
 * @method toJSON
 * @memberOf TranslateXML
 * @param {data} XML template
 * @returns {Object} Teplate Object
 * @returns {Object.template} Teplate in JSON format
 * @returns {Object.fields} Fields in JSON format
 */
TranslateXML.prototype.toJSON = function(data) {
  let template = nodexml.xml2obj(data);
   console.log(JSON.stringify(template));
  let fields = this.getFields(template);
   console.log(JSON.stringify(fields));

   Meteor.myFunctions.MessageSender.new({templateUpload:true, title:"Template en cours d'upload..", percent:60}, this.msObject);

  return {
    template: template,
    fields: fields
  };
};

/**
 * @summary Extract fields from the XML template
 * @memberOf TranslateXML
 * @method getFields
 * @param {data} XML template
 * @returns {Array} Array of all fields in the XMl template
 */
TranslateXML.prototype.getFields = function(data) {
  let fields = [];

  for (let prop in data) {
    if (prop === this.fieldName) {
      fields = fields.concat(data[prop]);
    } else if (data[prop] instanceof Object) {
      let resultTemp = this.getFields(data[prop]);

      if (resultTemp) {
        fields = fields.concat(resultTemp);
      }
    }
  }

  return fields;
};

/**
 * @summary Validate the XML template against the XSD schema
 * @memberOf TranslateXML
 * @method verifiySchema
 * @param {data} XML template
 * @returns {Boolean} If valid or not
 * @see {@link http://www...github.com/albanm/node-libxml-xsd|libxml-xsd}
 */
TranslateXML.prototype.verifiySchema = function(data) {
  let future = new Future();

  let self = this;
  xmlvalidator.parseFile(this.schema, Meteor.bindEnvironment((err, s) => {
    s.validate(data,  Meteor.bindEnvironment((err, validationErrors) => {

      if (err) {
        let errStr = " Ligne "+err.int1+" colonne "+err.column+".";
        Meteor.myFunctions.MessageSender.new({templateUpload:true, title:"Erreur lors de la validation du XML..", errorMessage:errStr, percent:20}, self.msObject);
        return future.return(false);
      } else {
        return future.return(true);
      }
    }));
  }));

  return future.wait();
};


Meteor.myFunctions.TranslateXML = new TranslateXML();
