


Schema = {
	templatesOptions: new SimpleSchema({
	   choose: {
		  type: Number,
		  allowedValues: [
			 1,
			 2,
			 3
		  ],
		  optional: true,
		  label: "Choose a template",
		  autoform: {
			 options: [
				{
				   label: "Template 1",
				   value: 1,
				},
				{
				   label: "Template 2",
				   value: 2
				},
				{
				   label: "Template 3",
				   value: 3
				}
			 ]
		  }
	   }
	}),
};


if (Meteor.isClient) {
  Session.setDefault('formSchema', []);
  Session.setDefault('templatesOptions', 'templatesOptions');

  Template.form.helpers({
    formSchema: function () {
		return Session.get('formSchema');
    },
	  
	templatesOptions: function () {
      return Schema[Session.get('templatesOptions')];
    }
  });

  Template.form.events({
	  
    'click .btn-change-schema': function (e) {
      var $btn = $(e.target);
      var schema = $btn.data('schema');

      Session.set('formSchema', schema);
    }, 
	  
	'change #templatedd': function (e) {
		
		let fields = [];
		let n = parseInt($('select#templatedd').val());
		
		for (let i =0; i<n; i++){
			let field = {
				fieldName: "Field " + i+1,
				fieldType: "text"
			  };
			
			fields.push(field);
		}

		console.log($('select#templatedd').val());
		
		Session.set('formSchema', fields);
    },
	  
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

		Meteor.call('PDF.generate',
		  datas, (err, res) => {
			if (err)
			  console.log(err);
			else
			  Session.set('generatedFile', res);
		  });
	  }
	  
  });
}
