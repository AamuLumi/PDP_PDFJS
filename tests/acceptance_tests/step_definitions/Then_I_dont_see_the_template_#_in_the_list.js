module.exports = function() {
  this.Then(/^I dont see the template "([^"]*)" in the list$/,
    function(arg) {
      browser.waitForExist('#templatedd');
      let doesNotExist = browser.waitForExist(
        'option[value="' + arg + '"]', 2000, true);
      expect(doesNotExist).toBe(true);
    });
};
