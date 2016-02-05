let path = Meteor.npmRequire('path');

Meteor.myFunctions.translate = function (data, filename){
  let ext = path.extname(filename);
  let translator = undefined;

  if (ext === ".xml")
    translator = Meteor.myFunctions.translate_XML;

  if (translator)
    return translator.translate(data);
  else
    return undefined;
}
