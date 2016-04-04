import { Collections } from '../../../../api/collections.js';

import './form.html';
import '../upload/upload.js';
import '../formField/formField.html';


if (Meteor.isClient) {
  Session.setDefault('formSchema', []);
  Session.setDefault('selectedTemplate', '');

  Template.form.helpers({

    isTemplateSelected: function(){
      return (Session.get('selectedTemplate') !== '');
    },

    formSchema: function() {
      return Session.get('formSchema');
    },

    templatesOptions: function() {

      let templates = Collections.Templates.find({});

      let options = [];
      console.log(templates);

      templates.forEach(function(template) {
          options.push({label: template.title, value: template.title});
          console.log( template.title );
      });

      return new SimpleSchema({
         choose: {
           type: Number,
           allowedValues: [
             1,
             2,
             3
           ],
           optional: true,
           label: 'Choose a template',
           autoform: {
             options: options
           }
         }
       });
    }
  });

  Template.form.events({
    'change #templatedd': function(e) {
      let selectedTemplate = $('select#templatedd').val();

      Session.set('selectedTemplate', selectedTemplate);

      let formSchema = [];

      if (selectedTemplate !== ''){
        let fields = Collections.Fields.findOne({title:selectedTemplate});

        for (let i = 0; i < fields.content.length; i++) {
          let fieldObject = {};
          console.log(fields.content);
          let field = fields.content[i];

          if ('name' in field)
            fieldObject.fieldName = field.name;
          else
            fieldObject.fieldName = 'Field ' + (i + 1);

          if ('type' in field)
            fieldObject.fieldType = field.type;
          else
            fieldObject.fieldType = 'text';

          if ('default' in field)
            fieldObject.fieldDefault = field.default;
          else
            fieldObject.fieldDefault = '';

          if ('maxSize' in field)
            fieldObject.fieldMaxSize = field.maxSize;
          else
            fieldObject.fieldMaxSize = '200';

          if ('minSize' in field)
            fieldObject.fieldMinSize = field.minSize;
          else
            fieldObject.fieldMinSize = '0';

          formSchema.push(fieldObject);
        }
      }

      console.log($('select#templatedd').val());

      Session.set('formSchema', formSchema);
    },

    'submit .generatePDF': function(event) {
      event.preventDefault();

      let datas = {};
      let c = undefined;
      let selectedTemplate = Session.get('selectedTemplate');
      console.log(selectedTemplate);
      $.each($(event.target).find(':input'), (key) => {
        c = event.target[key];
        if (c.type !== 'file' && c.type !== 'fieldset' && c.classList[0] !== 'upload') {
          console.log(c.type);
          datas[c.name] = c.value;
        }
      });

      console.log(datas);

      if (selectedTemplate !== '') {
        Meteor.call('PDF.generate',
          datas, selectedTemplate, Session.get('subscribeID'));
        }
    },

    'click .deleteBtn' : function(event) {
       event.preventDefault();

       let selectedTemplate = Session.get('selectedTemplate');

       if (selectedTemplate !== ''){
         Collections.Templates.remove({_id:selectedTemplate});
         Collections.Fields.remove({_id:selectedTemplate});
         Session.set('formSchema', []);
         Session.set('selectedTemplate', '');
       }
    }
  });
}
