module.exports = function() {
  this.Then(/^I see the PDF$/, function() {
    let errorValue = -1;

    browser.close();
    browser.switchTab();
    expect(browser.getUrl().indexOf(
        'data:application/pdf;base64,'))
      .toBeGreaterThan(errorValue);
  });
};
