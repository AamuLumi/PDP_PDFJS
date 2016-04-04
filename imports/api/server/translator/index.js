import path from 'path';
import Future from 'fibers/future';
import fs from 'fs';
import DOCXTranslator from './docx';
import XMLTranslator from './xml';
import MessageSender from '../tools/messageSender';
import { Collections } from '../../collections.js';


/**
 * @summary Get a temporary file from the folder ../web.browser/app/TempFiles
 * @method GetTempFile
 * @memberOf translate
 * @param {String} name The name of the file, without the file extension
 * @returns {data} The content of the file
 */
function GetTempFile(name) {

  let future = new Future();

  fs.readFile('../web.browser/app/TempFiles/filestoprocess-' +
    name, 'utf8',
    Meteor.bindEnvironment(function(err, data) {
      if (err) {
        return console.log(err);
      }

      return future.return(data);
    }));

  return future.wait();

}
/**
 * @summary Translate a file to the JSON format, and add it to the DB
 * @method translate
 * @param {String} id The file Id as generated by the Collection
 * @param {String} filename The full name of the file, with file extension
 */
export default function translate(id, filename, msObject) {
  MessageSender.new({
    templateUpload: true,
    title: 'Template en cours de téléversement..',
    name: filename,
    percent: 20,
    type: 'info'
  }, msObject);

  let ext = path.extname(filename);
  let nameWext = path.basename(filename, ext);

  let translator = undefined;
  let data = undefined;

  if (ext === '.xml') {
    data = GetTempFile(id + '-' + filename);
    translator = XMLTranslator;
  } else if (ext === '.docx') {
    data = '../web.browser/app/TempFiles/filestoprocess-' + id +
      '-' + filename;
    translator = DOCXTranslator;
  } else {
    MessageSender.new({
      templateUpload: true,
      title: 'Format non reconnu.',
      errorMessage: 'Format non reconnu, les formats compatibles sont : XML, DOCX',
      percent: 20,
      type: 'danger'
    }, msObject);
  }

  if (translator && data) {

    data.filename = filename;
    let result = translator.translate(data, msObject);

    Collections.FilesToProcess.remove({_id: id});

    if (result !== undefined) {

      Collections.Templates.upsert({
        _id: nameWext,
        title: nameWext
      }, {
        content: result.template,
        _id: nameWext,
        title: nameWext
      });

      Collections.Fields.upsert({
        _id: nameWext,
        title: nameWext
      }, {
        content: result.fields,
        _id: nameWext,
        title: nameWext
      });

      MessageSender.new({
        templateUpload: true,
        title: 'Template téléversé !',
        percent: 100,
        name: filename,
        type: 'info'
      }, msObject);

    }

  }

};