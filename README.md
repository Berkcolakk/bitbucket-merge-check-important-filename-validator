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
  git clone https://github.com/Berkcolakk/bitbucket-merge-check-important-filename-validator.git
```
2. Install dependecies
```bash 
  npm install
```
3. 
```bash 
  forge deploy
```
4. 
```bash 
  forge install 
```

If you need to fix the code on the forge side, use this code
```bash 
  forge install  --upgrade
```
