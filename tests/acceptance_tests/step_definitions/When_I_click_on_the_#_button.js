module.exports = function() {
  this.When(/^I click on the "([^"]*)" button$/, function (arg) {
    browser.waitForExist('.'+arg);
    browser.click('.'+arg);
  });
};
