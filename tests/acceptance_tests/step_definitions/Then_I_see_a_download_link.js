module.exports = function() {
  this.Then(/^I see a download link$/, function () {
    browser.waitForExist('.generatedPDFLink');
  });
};
