@watch
Feature: Generate PDF with predefined form

  Scenario: Generate basic empty PDF
    Given I have visited the application
    When I select the form "template_base"
     And I click on the "generatePDFb" button
    Then I see a download link
    When I click on generated link
    Then I see the PDF
