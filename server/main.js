Meteor.startup(function() {

});

Meteor.methods({
  'PDF.generate' ({datas}) {
    return "http://" + this.connection.httpHeaders.host + '/' +
      Meteor.myFunctions.generatePDF(datas);
  }
});
