/**
 * load_tests module
 *
 * This module run performance tests on the server.
 * It creates child process to launch tests.
 * When child process finished, program get result and launch next process.
 */

'use strict';

// Parameters of performance tests
const NB_TRY = 100;
const NB_CLIENTS = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const TEST_FILES = ['./templateUpload.js', './PDFGeneration.js', ];
const TEMPLATES = ['template_1_pages', 'template_5_pages',
  'template_15_pages', 'template_25_pages'
];

// Lib
const execFile = require('child_process').execFile;

// cursor on the NB_CLIENTS array
let cursorNBC = 0;

// cursor on the TEST_FILES array
let cursorTF = 0;

// cursor on the TEMPLATES array
let cursorT = 0;

// Array containing the result
let res = [];

/**
 * Use the result after tests
 */
function useResult() {
  console.log(res);
}

/**
 * Launch a test in a child process
 */

function startTest() {

  let str = '';

  if (cursorNBC === 0) {
    str = 'Template : ' + TEMPLATES[cursorT];
    console.log(str);
    res.push(str);
    str = 'Test de : ' + TEST_FILES[cursorTF];
    console.log(str);
    res.push(str);
  }

  str = 'Essais : ' + NB_TRY +
    ' - Clients  : ' + NB_CLIENTS[cursorNBC];
  console.log(str);

  // Launch the test file in a child process
  execFile('node', ['./loadTest.js', NB_TRY, NB_CLIENTS[
    cursorNBC], TEST_FILES[cursorTF], TEMPLATES[cursorT]], (
    err, out, stderr) => {
    // Communicate with the client
    if (err) throw err;
    if (stderr) console.log(stderr);
    else console.log('Test fini.');

    // Add the result to the res array
    res.push(JSON.parse(out));

    // Go to next NB_CLIENTS
    cursorNBC++;

    // Check if tests are finished
    if (cursorNBC < NB_CLIENTS.length) startTest();
    else if (cursorTF < TEST_FILES.length - 1) {
      cursorTF++;
      cursorNBC = 0;
      startTest();
    } else if (cursorT < TEMPLATES.length - 1) {
      cursorT++;
      cursorNBC = 0;
      cursorTF = 0;
      startTest();
    } else useResult();
  });
}

// Start the test
startTest();
