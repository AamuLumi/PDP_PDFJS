module.exports = function() {
  this.Then(/^I see the PDF$/, function() {
    browser.close();
    browser.switchTab();
    expect(browser.getUrl().indexOf(
        'data:application/pdf;base64,'))
      .toBeGreaterThan(-1);
  });
};
