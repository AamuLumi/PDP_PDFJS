/**
 * Script based on meteor-down to test a Meteor function.
 * It send a JSON object on stdout when finished.
 */

'use strict';

// $var$ are replaced in the file reader (PDFGenerationTest.js)
const NB_TRY = $NB_TRY$;
const NB_CLIENTS = $NB_CLIENTS$;
const TEMPLATE = $TEMPLATE$;

// Method to test
let methodName = 'xolvio/backdoor';

// Current cumulated time
let res = 0;

// Current number of clients who finished the method
let nbCountedClients = 0;

// Prepare the test
meteorDown.init(function (Meteor) {

  let f = function(path) {
    Meteor.myFunctions.DefaultTemplateLoader.load(path);
  };

  Meteor.call(methodName, f.toString(), ['../web.browser/app/'+TEMPLATE+'.xml'],
  function(err, result){
      // Kill the client (to create another)
      Meteor.kill();

      // Get time in data field
      for (let time of this.stats.data['method-response-time'][methodName]){
        res += time;
        nbCountedClients++;
        this.stats.data['method-response-time'][methodName].splice(0, 1);
      }

      // When we have done enough tries
      if (nbCountedClients === NB_TRY){
        // Return a JSON Object on stdout
        let resObject = {
          'nbClients' : NB_CLIENTS,
          'time' : res/nbCountedClients
        };

        console.log(JSON.stringify(resObject));

        // Kill the process
        process.exit();
      }
    }.bind(this));
});

// Start the test
meteorDown.run({
  concurrency: NB_CLIENTS,
  url: 'http://localhost:3000'
});
