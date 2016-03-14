let nodexml = Meteor.npmRequire('nodexml');
let xmlvalidator = Meteor.npmRequire('libxml-xsd');
let Future = Meteor.npmRequire('fibers/future');
let sleep = Meteor.npmRequire('sleep');

/**
 * This module need to setup JAVA_HOME variable in system environment
 */

//TODO: returns
let translateXML = function() {
  this.schema = '../web.browser/app/template_example.xsd';
  this.fieldName = 'field';
};

/**
 * Validate the XML template against the XSD schema and
 * convert the XML template in two JSON object, the template and the fields
 * @param {data} XML template
 */
translateXML.prototype.translate = function(data) {
  console.log('Starting XML translating ..');

  if (this.verifiySchema(data)) {
    return this.toJSON(data);
  }

  return;
};

/**
 * Convert the XML template in two JSON object, the template and the fields
 * @param {data} XML template
 */
translateXML.prototype.toJSON = function(data) {
  let template = nodexml.xml2obj(data);
   console.log(JSON.stringify(template));
  let fields = this.getFields(template);
   console.log(JSON.stringify(fields));
  //
  //sleep.sleep(10);

  return {
    template: template,
    fields: fields
  };
};

/**
 * Extract fields from the XML template
 * @param {data} XML template
 */
translateXML.prototype.getFields = function(data) {
  let result = [];

  for (let prop in data) {
    if (prop === this.fieldName) {
      result = result.concat(data[prop]);
    } else if (data[prop] instanceof Object) {
      let resultTemp = this.getFields(data[prop]);

      if (resultTemp) {
        result = result.concat(resultTemp);
      }
    }
  }

  return result;
};

/**
 * Validate the XML template against the XSD schema
 * @param {data} XML template
 */
translateXML.prototype.verifiySchema = function(data) {
  let future = new Future();

  xmlvalidator.parseFile(this.schema, function(err, s){
    s.validate(data, function(err, validationErrors){

      if (err) {
        console.log(err);
        return future.return(false);
      } else {
        return future.return(true);
      }
    });
  });

  return future.wait();
};


Meteor.myFunctions.translateXML = new translateXML();
