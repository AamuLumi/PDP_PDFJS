@watch
Feature: Upload and delete a template

  Scenario: Successfully upload a template and then delete it
    Given I have visited the application
    When I upload the file "/home/val/Bureau/Projet/PDP_PDFJS/tests/files/template_OK.xml"
    Then I see the message "templateUploaded"
    And I see the template "template_OK" in the list
    When I select the form "template_OK"
    And I click on the "deleteBtn" button
    Then I dont see the template "template_OK" in the list
