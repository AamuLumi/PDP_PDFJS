module.exports = function() {
  this.When(/^I click on generated link$/, function () {
    browser.click('a.generatedPDFLink');
  });
};
