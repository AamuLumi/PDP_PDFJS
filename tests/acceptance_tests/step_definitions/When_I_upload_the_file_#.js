//TODO: find a way to take a relative path as parameter

module.exports = function() {
  this.When(/^I upload the file "([^"]*)"$/, function (arg) {
    browser.waitForExist('.file');
    browser.setValue('input[type=file]', arg);
  });
};
