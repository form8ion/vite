Feature: Scaffolder

  @wip
  Scenario: Scaffold for a package-type project
    Given the project-type is "Package"
    When the project is scaffolded
    Then vite is installed
    And library mode is enabled

  Scenario: Scaffold for a different-type project
    Given the project-type is "Other"
    When the project is scaffolded
    Then vite is installed
    And basic config is defined
