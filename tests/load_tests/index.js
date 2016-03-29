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
const TEST_FILES = ['./PDFGeneration.js', './templateUpload.js'];
const TEMPLATES = ['template_2_pages', 'template_20_pages', 'template_200_pages'];


// Lib
const execFile = require('child_process').execFile;

// cursor on the NB_CLIENTS array
let cursor_nbc = 0;

// cursor on the TEST_FILES array
let cursor_tf = 0;

// cursor on the TEMPLATES array
let cursor_t = 0;

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

  let str;

  if (cursor_nbc == 0){
    str = 'Template : '+ TEMPLATES[cursor_t];
    console.log(str);
    res.push(str);
    str = 'Test de : '+ TEST_FILES[cursor_tf];
    console.log(str);
    res.push(str);
  }

  str = 'Essais : ' + NB_TRY +
    ' - Clients  : ' + NB_CLIENTS[cursor_nbc];
  console.log(str);


  // Launch the test file in a child process
  execFile('node', ['./loadTest.js', NB_TRY, NB_CLIENTS[
    cursor_nbc], TEST_FILES[cursor_tf], TEMPLATES[cursor_t]], (err, out, stderr) => {
    // Communicate with the client
    if (err) throw err;
    if (stderr) console.log(stderr);
    else console.log('Test fini.');

    // Add the result to the res array
    res.push(JSON.parse(out));

    // Go to next NB_CLIENTS
    cursor_nbc++;

    // Check if tests are finished
    if (cursor_nbc < NB_CLIENTS.length) startTest();
    else if (cursor_tf < TEST_FILES.length-1) {
      cursor_tf++;
      cursor_nbc = 0;
      startTest();
    }
    else if (cursor_t < TEMPLATES.length-1) {
      cursor_t++;
      cursor_nbc = 0;
      cursor_tf = 0;
      startTest();
    }
    else useResult();
  });
}

// Start the test
startTest();
