Feature: Generate PDF with a value

  Scenario: Generate PDF with value "Coucou" in one field
    Given I have visited the application
    When I select the form "template_base"
    Then I put "γειά σου" in the field in the form
    When I click on the "generatePDFButton" button
    Then I see a download link
    When I click on generated link
    Then I see the PDF
