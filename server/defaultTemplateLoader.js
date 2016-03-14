let Future = Meteor.npmRequire('fibers/future');
let fs = Meteor.npmRequire('fs');
let path = Meteor.npmRequire('path');

/**
* Load some basics templates at startup
*/
let defaultTemplateLoader = function() {
  this.files = ['../web.browser/app/template_base.xml'];
};

defaultTemplateLoader.prototype.load = function() {
    Collections.FilesToProcess.insert(this.files[0]);
};

Meteor.myFunctions.defaultTemplateLoader = new defaultTemplateLoader();
