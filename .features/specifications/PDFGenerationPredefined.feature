@watch
Feature: Generate PDF with predefined form

  Scenario: Generate basic empty PDF
    Given I have visited the application
    When I select the base form
    When I click on the Generate button
    Then I see a download link
    When I click on generated link
    Then I see the PDF
