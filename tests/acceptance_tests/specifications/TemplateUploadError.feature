Feature: Upload a template

  Scenario: Unsuccessfully upload a template
    Given I have visited the application
    When I upload the file "/home/val/Bureau/Projet/PDP_PDFJS/tests/files/template_Error.xml"
    Then I see the message "panel-danger"
    And I dont see the template "template_Error" in the list
