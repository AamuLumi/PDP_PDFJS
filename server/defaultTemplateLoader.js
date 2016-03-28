let Future = Meteor.npmRequire('fibers/future');
let fs = Meteor.npmRequire('fs');
let path = Meteor.npmRequire('path');

/**
 * @summary Constructor for the Default Template Loader.
 * An DefaultTemplateLoader object is returned by Meteor.myFunctions.DefaultTemplateLoader
 * This class is used to load some default templates at the startup
 * @instancename DefaultTemplateLoader
 * @class
*/
let DefaultTemplateLoader = function() {
  this.files = ['../web.browser/app/template_base.xml'];
};

/**
 * @summary Load all the files specified in the array this.files
 * @method load
 * @memberOf DefaultTemplateLoader
  */
DefaultTemplateLoader.prototype.load = function() {

    let filefs = new FS.File(this.files[0]);

    filefs.metadata = {
        subscribeID: 'server'
    };

    Collections.FilesToProcess.insert(filefs);
};

Meteor.myFunctions.DefaultTemplateLoader = new DefaultTemplateLoader();
