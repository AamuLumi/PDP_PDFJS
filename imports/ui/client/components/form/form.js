import {
  Collections
}
from '../../../../api/collections.js';

import './form.html';
import '../upload/upload.js';
import '../formField/formField.html';


if (Meteor.isClient) {
  Session.setDefault('formSchema', []);
  Session.setDefault('selectedTemplate', '');

  Template.form.helpers({
    // Check if the template is selected
    isTemplateSelected: function() {
      return (Session.get('selectedTemplate') !== '');
    },

    // Get the form schema
    formSchema: function() {
      return Session.get('formSchema');
    },

    // Get templates available
    templatesOptions: function() {
      let templates = Collections.Templates.find({});

      let options = [];

      // Create a template selector element
      templates.forEach(function(template) {
        options.push({
          label: template.title,
          value: template.title
        });
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
    // On selecting a new template
    'change #templatedd': function(e) {
      // Get the selected template
      let selectedTemplate = $('select#templatedd').val();

      // Update current selected template
      Session.set('selectedTemplate', selectedTemplate);

      let formSchema = [];

      // If template is valid
      if (selectedTemplate !== '') {
        // Get template fields from DB
        let fields = Collections.Fields.findOne({
          title: selectedTemplate
        });

        // Create the form
        // It compute a form with the fields JSON
        for (let i = 0; i < fields.content.length; i++) {
          let fieldObject = {};
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

      // Set current form
      Session.set('formSchema', formSchema);
    },

    // On button generate PDF click
    'submit .generatePDF': function(event) {
      // Remove default button actin
      event.preventDefault();

      let datas = {};
      let c = undefined;

      // Get the template
      let selectedTemplate = Session.get(
        'selectedTemplate');

      // For each fields
      $.each($(event.target).find(':input'), (key) => {
        c = event.target[key];
        // If field is in the form
        if (c.type !== 'file' && c.type !== 'fieldset' &&
          c.classList[0] !== 'upload') {
            // Add field value to datas
          datas[c.name] = c.value;
        }
      });

      // If selected template is valid
      if (selectedTemplate !== '') {
        // Generate a PDF
        Meteor.call('PDF.generate',
          datas, selectedTemplate, Session.get(
            'subscribeID'));
      }
    },

    // On button delete template click
    'click .deleteBtn': function(event) {
      // Remove default action
      event.preventDefault();

      let selectedTemplate = Session.get(
        'selectedTemplate');

      // If template is valid
      if (selectedTemplate !== '') {
        // Remove template from DB
        Collections.Templates.remove({
          _id: selectedTemplate
        });
        Collections.Fields.remove({
          _id: selectedTemplate
        });

        // Set client selection to null
        Session.set('formSchema', []);
        Session.set('selectedTemplate', '');
      }
    }
  });
}
