Template.generatedFiles.helpers({

  'messages': function() {

    let messages = [];
    Collections.Messages.find({}).forEach(function(obj){
      console.log(obj.content.name);
        messages.unshift(obj.content);
      });
    return messages;

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
