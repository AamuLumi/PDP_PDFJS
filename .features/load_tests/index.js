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

// Lib
const execFile = require('child_process').execFile;

// Cursor on the NB_CLIENTS array
let cursor = 0;

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
  console.log('Test - Essais : ' + NB_TRY +
    ' - Clients max : ' + NB_CLIENTS[cursor]);

  // Launch the test file in a child process
  execFile('node', ['./PDFGenerationTest.js', NB_TRY, NB_CLIENTS[
    cursor]], (err, out, stderr) => {
    // Communicate with the client
    if (err) throw err;
    if (stderr) console.log(stderr);
    else console.log('Test fini.');

    // Add the result to the res array
    res.push(JSON.parse(out));

    // Go to next NB_CLIENTS
    cursor++;

    // Check if tests are finished
    if (cursor < NB_CLIENTS.length) startTest();
    else useResult();
  });
}

// Start the test
startTest();
