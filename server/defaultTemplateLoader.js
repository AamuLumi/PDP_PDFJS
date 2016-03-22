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

    let filefs = new FS.File(this.files[0]);

    filefs.metadata = {
        subscribeID: 'server'
    };

    Collections.FilesToProcess.insert(filefs);
};

Meteor.myFunctions.defaultTemplateLoader = new defaultTemplateLoader();
