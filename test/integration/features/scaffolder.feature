Feature: Scaffolder

  @wip
  Scenario: Scaffold for a package-type project
    Given the project-type is "Package"
    When the project is scaffolded
    Then vite is installed
    And library mode is enabled
