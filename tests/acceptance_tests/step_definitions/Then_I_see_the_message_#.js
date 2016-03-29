module.exports = function() {
  this.Then(/^I see the message "([^"]*)"$/, function (arg) {
    browser.waitForExist('.'+arg);
  });
};
