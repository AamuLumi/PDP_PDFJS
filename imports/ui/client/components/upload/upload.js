import { Collections } from '../../../../api/collections.js';

import './upload.html';

Template.upload.events({
  // On file field change
  'change .file': function(event, template) {
    // Upload the file
    FS.Utility.eachFile(event, function(file) {
      // Get the file in FSCollection format
      let filefs = new FS.File(file);

      // Add some metadata
      filefs.metadata = {
          subscribeID: Session.get('subscribeID')
      };

      // Uplaod it to DB
      Collections.FilesToProcess.insert(filefs, function (err, fileObj) {
        if (err) console.err(err);
      });

      // Re-init the file field
      $('.file').val('');
    });
  }
});
