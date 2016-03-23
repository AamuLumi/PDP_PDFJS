module.exports = function() {
  this.When(/^I select the base form$/, function () {
    browser.waitForExist('#templatedd');
    browser.waitForExist('option[value="template_base"]');
    browser.selectByValue('#templatedd', 'template_base');
  });
};
