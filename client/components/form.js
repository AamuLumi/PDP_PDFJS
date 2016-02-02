Template.form.helpers({
  fields: [{
    fieldName: "value1",
    fieldType: "text"
  }, {
    fieldName: "value2",
    fieldType: "text"
  }, {
    fieldName: "value3",
    fieldType: "text"
  }]
});

Template.form.events({
  "submit .generatePDF": function(event) {
    event.preventDefault();

    let datas = {};
    let c = undefined;
    let button = undefined;

    $.each($(event.target).find(':input'), (key, value) => {
      c = event.target[key];
      if (c.getAttribute('type') !== 'submit')
        datas[c.name] = c.value;
      else {
        button = c;
      }
    });

    Meteor.call('PDF.generate', {
      datas: datas
    }, (err, res) => {
      if (err)
        alert(err);
      else
        Session.set('generatedLink', res);
    });
  }
});
