module.exports = function() {
  this.When(/^I select the first form$/, function () {
    browser.selectByValue('#templatedd', '1');
  });
};
