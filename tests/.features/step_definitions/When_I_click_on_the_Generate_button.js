module.exports = function() {
  this.When(/^I click on the Generate button$/, function () {
    browser.click('button.generatePDF');
  });
};
