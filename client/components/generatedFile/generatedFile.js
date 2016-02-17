Template.generatedFile.helpers({
  'file': function() {
    let c = Collections.PDF.findOne(Session.get('generatedFile'));
    return c;
  },
  'data': function(){

  }
});

Template.generatedFile.events({
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
