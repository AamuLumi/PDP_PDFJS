/**
 * load_tests module
 *
 * This is a child process.
 *
 * Arguments :
 * - argv[2] : nombre d'essais
 * - argv[3] : nombre de clients
 *
 * It's based on meteor-down code.
 * (https://github.com/meteorhacks/meteor-down/blob/master/bin/meteor-down.js)
 */

'use strict';

// High number for the maxSockets
require('http').globalAgent.maxSockets = 999999;

// Libs
const fs = require('fs');
const vm = require('vm');
const MeteorDown = require('meteor-down');

// The meteor-down object who create a connection with the server
let meteorDown = new MeteorDown();

// Read the file containing the meteor-down test
let testFile = fs.readFileSync(String((process.argv[4]))).toString();

// Replace $var$ with good values
let currentTest = testFile.replace('$NB_TRY$', parseInt(process.argv[2]))
    .replace('$NB_CLIENTS$', parseInt(process.argv[3]))
    .replace('$TEMPLATE$', '"'+String(process.argv[5])+'"');

// Create a context for the vm
let context = {
  require: require,
  meteorDown: meteorDown,
  console: console,
  process: process
};

// Run the vm (https://nodejs.org/api/vm.html)
vm.runInNewContext(currentTest, context);
