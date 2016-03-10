@watch
Feature: Generate PDF with a value

  Scenario: Generate PDF with value "Coucou" in one field
    Given I have visited the application
    When I select the first form
    Then I put "Coucou" in the field in the form
    When I click on the Generate button
    Then I see a download link
    When I click on generated link
    Then I see the PDF
