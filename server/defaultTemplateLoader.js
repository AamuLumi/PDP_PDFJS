/**
 * @summary Constructor for the Default Template Loader.
 * An DefaultTemplateLoader object is returned by
 * Meteor.myFunctions.DefaultTemplateLoader
 * This class is used to load some default templates at the startup
 * @instancename DefaultTemplateLoader
 * @class
*/
let DefaultTemplateLoader = function() {
  this.files = ['../web.browser/app/template_base.xml'];
};

/**
 * @summary Load all the files specified in the array this.files
 * @method loadAll
 * @memberOf DefaultTemplateLoader
  */
DefaultTemplateLoader.prototype.loadAll = function() {
  for (var i = 0; i < this.files.length; i++) {
    this.load(this.files[i]);
  }
};

/**
 * @summary Load a file
 * @method load
 * @memberOf DefaultTemplateLoader
  */
DefaultTemplateLoader.prototype.load = function(path) {

    let filefs = new FS.File(path);

    filefs.metadata = {
        subscribeID: 'server'
    };

    Collections.FilesToProcess.insert(filefs);
};

Meteor.myFunctions.DefaultTemplateLoader = new DefaultTemplateLoader();
