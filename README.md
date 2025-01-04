# Forge PR Check App

This Forge application automates pull request (PR) checks in a Bitbucket repository by validating PRs based on file changes and approvals.

## Features

- Fetches changed files in a pull request using the Bitbucket API.
- Validates against restricted file modifications.
- Checks the number of approvals on a pull request.
- Returns a success or failure response based on validation rules.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/forge-pr-check-app.git
   cd forge-pr-check-app
