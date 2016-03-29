module.exports = function() {
  this.Then(/^I see the template "([^"]*)" in the list$/, function (arg) {
    browser.waitForExist('#templatedd');
    browser.waitForExist('option[value="'+arg+'"]');
  });
};
