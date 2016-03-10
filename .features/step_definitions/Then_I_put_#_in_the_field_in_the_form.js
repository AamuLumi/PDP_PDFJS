module.exports = function() {
  this.Then(/^I put "([^"]*)" in the field in the form$/, function (arg1) {
    browser.setValue('input[name="Field 01"]', arg1);
  });
};
