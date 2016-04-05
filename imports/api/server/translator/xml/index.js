import nodexml from 'nodexml';
import xmlvalidator from 'libxml-xsd';
import Future from 'fibers/future';
import MessageSender from '../../tools/messageSender';
import Collections from '../../../collections.js';

/**
 * @summary Constructor for the XML translator
 * An TranslateXML object is returned by TranslateXML module
 * @instancename TranslateXML
 * @class
 */
let TranslateXML = function() {
  //XSD Schema path
  this.schema = '../web.browser/app/template_example.xsd';
  //Field identifier
  this.fieldName = 'field';
};

/**
 * @summary Validate the XML template against the XSD schema and
 * convert the XML template in two JSON object, the template and the fields
 * @method translate
 * @memberOf TranslateXML
 * @param {String} data XML template
 * @returns {Object} Object Template Object
 * @returns {Object.template} Template in JSON format
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
 * @summary Convert the XML template in two JSON object, the template and
 * the fields
 * @method toJSON
 * @memberOf TranslateXML
 * @param {String} data XML template
 * @returns {Object} Template Object
 * @returns {Object.template} Template in JSON format
 * @returns {Object.fields} Fields in JSON format
 */
TranslateXML.prototype.toJSON = function(data) {
  let template = nodexml.xml2obj(data);
  let fields = this.getFields(template);

  MessageSender.new({
    templateUpload: true,
    title: 'Template en cours de téléversement..',
    percent: 60,
    type: 'info'
  }, this.msObject);

  return {
    template: template,
    fields: fields
  };
};

/**
 * @summary Extract fields from the JSON template
 * @memberOf TranslateXML
 * @method getFields
 * @param {String} data JSON template
 * @returns {Array} Array of all fields in the JSON template
 */
TranslateXML.prototype.getFields = function(data) {
  let fields = [];

  // For each properties in data
  for (let prop in data) {
    // If prop is a field, we add it to the array
    if (prop === this.fieldName) {
      fields = fields.concat(data[prop]);
    // If prop is a object we call recursively getFields with this object
    // as parameter
    } else if (data[prop] instanceof Object) {
      let resultTemp = this.getFields(data[prop]);
      //If the object contained fields, we add them to the array
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
 * @param {String} data XML template
 * @returns {Boolean} If valid or not
 * @see {@link http://www...github.com/albanm/node-libxml-xsd|libxml-xsd}
 */
TranslateXML.prototype.verifiySchema = function(data) {

  //Future is used to make async.call
  let future = new Future();

  let self = this;

  //Validate the XML against the XSD schema
  xmlvalidator.parseFile(this.schema, Meteor.bindEnvironment((
    err, s) => {
    s.validate(data, Meteor.bindEnvironment((err,
      validationErrors) => {

      //If the XML is not valid return false
      if (err) {
        //Error line/column
        let errStr = ' Ligne ' + err.int1 +
          ' colonne ' + err.column + '.';
        //Send an error mesage to the client
        MessageSender.new({
          templateUpload: true,
          title: 'Erreur lors de la validation du XML..',
          errorMessage: errStr,
          percent: 20,
          type: 'danger'
        }, self.msObject);
        console.log('XML Translation : Error');
        console.log(err);
        console.log(validationErrors);
        return future.return(false);
      //If valid return true
      } else {
        console.log('XML Translation : OK');
        return future.return(true);
      }
    }));
  }));

  return future.wait();
};


export default new TranslateXML();
