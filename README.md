# Forge PR Check App

This Forge application automates pull request (PR) checks in a Bitbucket repository by validating PRs based on file changes and approvals.

## Features

- Fetches changed files in a pull request using the Bitbucket API.
- Validates against restricted file modifications.
- Checks the number of approvals on a pull request.
- Returns a success or failure response based on validation rules.

## Installation

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

## Usage

The app performs the following checks when a pull request is created:

1. **Fetch Changed Files**  
   Retrieves a list of files modified in the pull request.

2. **Restricted File Validation**  
   Checks if restricted files are modified (`Data` array in `utils.ts`).

3. **Approval Validation**  
   Counts approvals in the pull request.

4. **Success Criteria**  
   - No restricted files have been modified, or
   - At least one approval exists.

### Example Response

```json
{
  "success": true,
  "message": {
    "changedFiles": ["src/components/Example.tsx"],
    "invalidFiles": [],
    "approvalCount": 2
  }
}
```

## Configuration

### Restricted Files

Update the `Data` array in `utils.ts` to include restricted file paths:

```typescript
export const Data = ["Test.tsx", "Modal.tsx"];
```

## API Endpoints

The app uses the following Bitbucket API endpoints:

- **Pull Request DiffStat**  
  Retrieves details of changed files in a pull request:  
  `GET /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/diffstat`

- **Pull Request Details**  
  Fetches details of a pull request, including participants and approvals:  
  `GET /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}`

## Error Handling

The app includes a utility function (`handleApiResponse`) to handle API errors consistently. If any API call fails, a detailed error message is logged.

## Development

### File Structure

```
src/
├── index.ts         # Entry point of the application
├── utils.ts         # Utility functions for API calls and data handling
└── types.ts         # TypeScript types and interfaces
```

### Scripts

- `npm run lint` - Lints the codebase.
- `npm run test` - Runs tests (if implemented).

## Contribution

Contributions are welcome! Feel free to submit issues and pull requests to improve this app.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

