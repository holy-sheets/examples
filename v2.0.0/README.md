HolySheets v2.0.0 Examples

# HolySheets v2.0.0 Examples

This directory contains example scripts demonstrating how to use HolySheets v2.0.0. It includes examples for both OAuth2 and JWT-based authentication flows, as well as CRUD operations (insert, fetch, update, delete) on Google Sheets data.

## Requirements

- [Node.js](https://nodejs.org/) (version specified in `.nvmrc`, e.g., `v22.11.0`)
- [pnpm](https://pnpm.io/) package manager

## Setup

1.  **Install Dependencies**
    From within this `v2.0.0` directory, run:

```bash
pnpm install
```

2.  **Create the `.env` File**
    Copy the provided `.env-example` file and update it with your credentials:

```bash
cp .env-example .env
```

Then edit the `.env` file with your specific values:

```bash
# Spreadsheet ID
SPREADSHEET_ID="YOUR_SPREADSHEET_ID_HERE"

# JWT Service Account Credentials (JSON string)
SERVICE_ACCOUNT_CREDENTIALS='{"type": "...", "project_id": "...", ... }'

# OAuth2 Credentials
OAUTH_CLIENT_ID="YOUR_OAUTH_CLIENT_ID_HERE"
OAUTH_CLIENT_SECRET="YOUR_OAUTH_CLIENT_SECRET_HERE"
OAUTH_REDIRECT_URI="YOUR_OAUTH_REDIRECT_URI_HERE"
OAUTH_REFRESH_TOKEN="YOUR_OAUTH_REFRESH_TOKEN_HERE"
```

> [!NOTE]
> For JWT credentials, you must provide a valid service account JSON object as a single-line string.
> For OAuth2, ensure you have a valid refresh token and other necessary credentials from the Google Cloud Console.

3.  **Run Examples**
    You can run the examples using the following commands:

- **JWT-based Example:**

```bash
pnpm run example:jwt
```

- **OAuth2-based Example:**

```bash
pnpm run example:oauth
```

These scripts will:

- Insert sample records
- Fetch records (single and multiple)
- Update records (single and multiple)
- Delete records (single and multiple)

All operations log metadata and results to the console.

## Additional Documentation

- **OAuth2 Authentication:** [https://holysheets.io/en/authentication/oauth2.html](https://holysheets.io/en/authentication/oauth2.html)
- **JWT Authentication:** [https://holysheets.io/en/authentication/jwt.html](https://holysheets.io/en/authentication/jwt.html)
- **HolySheets API Reference & Guides:** [https://holysheets.io/](https://holysheets.io/)

By following these steps and reviewing the provided examples, you should be able to quickly get started with HolySheets v2.0.0 and integrate it into your own projects.
