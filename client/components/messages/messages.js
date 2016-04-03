Template.generatedFiles.helpers({
  'messages': function() {
    let messages = [];
    Collections.Messages.find({}).forEach(function(obj){
        messages.unshift(obj.content);
      });

    return messages;
  },

  'compare': function(v1, v2) {
      return true;
  }

});

Template.fileGeneration.helpers({
  'compare': function(v1, v2) {
      return v1 === v2;
  }
});

Template.templateUpload.helpers({
  'compare': function(v1, v2) {
      return v1 === v2;
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
