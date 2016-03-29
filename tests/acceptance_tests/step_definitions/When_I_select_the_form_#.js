module.exports = function() {
  this.When(/^I select the form "([^"]*)"$/, function (arg) {
    browser.waitForExist('#templatedd');
    browser.waitForExist('option[value="'+arg+'"]');
    browser.selectByValue('#templatedd', arg);
  });
};
