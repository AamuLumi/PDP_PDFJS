Template.generatedFiles.helpers({
  'files': function() {
    if (Session.get('generatedFiles') === undefined)
      return [];

    let files = [];

    for (let f of Session.get('generatedFiles')){
      files.unshift(Collections.PDF.findOne(f));
    }

    return files;
  }
});

Template.generatedFiles.events({
  'click .generatedPDFLink': function(event) {
    event.preventDefault();

    let url = 'data:application/pdf;base64,';
    Meteor.call('PDF.get',
      event.target.name, (err, res) => {
        console.log(err);
        window.open(url + res);
      });

  }
});
