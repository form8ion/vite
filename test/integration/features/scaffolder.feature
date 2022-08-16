Feature: Scaffolder

  Scenario: Scaffold for a package-type project
    Given the project-type is "Package"
    When the project is scaffolded
    Then vite is installed
    And appropriate scripts are defined
    And library mode is enabled

  Scenario: Scaffold for a different-type project
    Given the project-type is "Other"
    When the project is scaffolded
    Then vite is installed
    And appropriate scripts are defined
    And basic config is defined
