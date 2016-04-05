/**
 * Unit tests for the Message module
 */

import TemplateInterpreter from './';
import {
  chai
}
from 'meteor/practicalmeteor:chai';
import {
  StubCollections
}
from 'meteor/stub-collections';
import {
  Collections
}
from '../../../collections.js';

let template = {
   "document":{
      "content":[
         {
            "text":"Field 1 :"
         },
         {
            "field":{
               "@":[
                  "type"
               ],
               "type":"date"
            }
         },
         {
            "text":{
               "@text":"Field 2 :",
               "@":[
                  "bold"
               ],
               "bold":"true"
            }
         },
         {
            "field":{
               "@":[
                  "type",
                  "name"
               ],
               "type":"number",
               "name":"Nombre test"
            }
         },
         {
            "text":"Field 3 :"
         },
         {
            "field":{
               "@":[
                  "type",
                  "default"
               ],
               "type":"text",
               "default":"Ceci est un champ prérempli"
            }
         },
         {
            "text":"H Line :"
         },
         {
            "line":{
               "@":[
                  "x1",
                  "x2",
                  "y1",
                  "y2",
                  "width"
               ],
               "x1":"10",
               "x2":"400",
               "y1":"10",
               "y2":"10",
               "width":"1"
            }
         },
         {
            "text":"Table :"
         },
         {
            "table":{
               "row":[
                  {
                     "content":[
                        {
                           "text":"C1 :"
                        },
                        {
                           "text":"C2 :"
                        },
                        {
                           "text":"C3 :"
                        }
                     ]
                  },
                  {
                     "content":[
                        {
                           "text":"C1"
                        },
                        {
                           "text":"C2"
                        },
                        {
                           "table":{
                              "row":[
                                 {
                                    "content":[
                                       {
                                          "text":"C1bis :"
                                       },
                                       {
                                          "text":"C2bis :"
                                       },
                                       {
                                          "text":"C3bis :"
                                       }
                                    ]
                                 },
                                 {
                                    "content":[
                                       {
                                          "text":"WOHO"
                                       },
                                       {
                                          "text":"WOHO"
                                       },
                                       {
                                          "text":"WOHO"
                                       }
                                    ]
                                 }
                              ]
                           }
                        }
                     ]
                  }
               ]
            }
         },
         {
            "text":"V Line :"
         },
         {
            "line":{
               "@":[
                  "x1",
                  "x2",
                  "y1",
                  "y2",
                  "width"
               ],
               "x1":"100",
               "x2":"100",
               "y1":"10",
               "y2":"100",
               "width":"1"
            }
         },
         {
            "text":{
               "@text":"Color",
               "@":[
                  "fontColor"
               ],
               "fontColor":"blue"
            }
         },
         {
            "text":{
               "@text":"Size",
               "@":[
                  "fontSize"
               ],
               "fontSize":"8"
            }
         }
      ]
   }
};

let pdfmakeObject = {
  content:[
  "Field 1 :",
  "Data1",
  {
    "bold": true,
    "text": "Field 2 :"
  },
  "Data2",
  "Field 3 :",
  " ",
  "H Line :",
  {
    "canvas": [
      {
        "type": "line",
        "x1": 10,
        "y1": 10,
        "x2": 400,
        "y2": 10,
        "lineWidth": 1
      }
    ]
  },
  "Table :",
  {
    "table": {
      "body": [
        [
          "C1 :",
          "C2 :",
          "C3 :"
        ],
        [
          "C1",
          "C2",
          {
            "table": {
              "body": [
                [
                  "C1bis :",
                  "C2bis :",
                  "C3bis :"
                ],
                [
                  "WOHO",
                  "WOHO",
                  "WOHO"
                ]
              ]
            }
          }
        ]
      ]
    }
  },
  "V Line :",
  {
    "canvas": [
      {
        "type": "line",
        "x1": 100,
        "y1": 10,
        "x2": 100,
        "y2": 100,
        "lineWidth": 1
      }
    ]
  },
  {
    "color": "blue",
    "text": "Color"
  },
  {
    "fontSize": 8,
    "text": "Size"
  }
]};

describe('Template Interpreter', function() {


  describe('Tools methods', function() {

    it('getTemplate(String)', function() {

      StubCollections.stub(Collections.Templates);
      Collections.Templates.insert({
        title: 'templateTest',
        content: 'contentTest'
      });
      chai.assert.equal(TemplateInterpreter.getTemplate('templateTest').content,
       'contentTest');
      StubCollections.restore();

    });

    it('setPDFmakeObject(String, String)', function() {
      let fieldsData = ['Data1', 'Data2'];
      chai.assert.deepEqual(TemplateInterpreter.setPDFmakeObject(
        template.document.content, fieldsData), pdfmakeObject.content);
    });

  });

  describe('Main methods', function() {

    it('templateToObject(Object, String)', function() {

      StubCollections.stub(Collections.Templates);
      Collections.Templates.insert({
        title: 'templateTest2',
        content: template
      });
      let fieldsData = {field1:'Data1', field2:'Data2'};
      chai.assert.deepEqual(TemplateInterpreter.templateToObject(fieldsData,
        'templateTest2'), pdfmakeObject);
      StubCollections.restore();

    });

  });

});
