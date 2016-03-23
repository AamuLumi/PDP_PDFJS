'use strict';

let current = 0;
const NB_TRY = 500;
const NB_CLIENTS = 50;
let res = 0;
let nbCountedClients = 0;
let methodName = 'PDF.generate';

meteorDown.init(function (Meteor) {
  Meteor.call('PDF.generate',
    {}, 'template_base', null, function(err, result){
      Meteor.kill();
      for (let time of this.stats.data['method-response-time'][methodName]){
        res += time;
        nbCountedClients++;
      }

      current++;
      if (current == NB_TRY){
        console.log('Déconnexion');
        console.log(res);
        console.log('Nombre d\'essais : ' + current);
        console.log('Nombre de clients : ' + nbCountedClients);
        console.log('Nombre de clients moyen par essai : ' + nbCountedClients/current);
        console.log('Temps moyen : ' + res/nbCountedClients);
        process.exit();
      }
    }.bind(this));
});

meteorDown.run({
  concurrency: NB_CLIENTS,
  url: "http://localhost:3000"
});
