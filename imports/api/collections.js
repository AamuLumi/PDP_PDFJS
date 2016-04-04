import { Mongo } from 'meteor/mongo';
import { Stores } from './stores.js';

let CollectionsObj = {};

// Add helper Collections for Client
Meteor.isClient && Template.registerHelper('Collections', CollectionsObj);

// Add all collections to DB
CollectionsObj.PDF = new FS.Collection('pdfs', {
  stores: [Stores.PDF]
});

CollectionsObj.FilesToProcess = new FS.Collection('filestoprocess', {
  stores: [Stores.FilesToProcess]
});

CollectionsObj.Templates = new Mongo.Collection('templates');

CollectionsObj.Fields = new Mongo.Collection('fields');

CollectionsObj.Messages = new Mongo.Collection('messages');

CollectionsGlobal = CollectionsObj;

export const Collections = CollectionsObj;
