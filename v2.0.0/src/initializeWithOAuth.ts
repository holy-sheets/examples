import { google } from 'googleapis'
import HolySheets from 'holysheets'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Retrieve necessary environment variables
const spreadsheetId = process.env.SPREADSHEET_ID as string
const clientId = process.env.OAUTH_CLIENT_ID as string
const clientSecret = process.env.OAUTH_CLIENT_SECRET as string
const redirectUri = process.env.OAUTH_REDIRECT_URI as string
const refreshToken = process.env.OAUTH_REFRESH_TOKEN as string

/**
 * Initializes the HolySheets instance with OAuth2 authentication.
 *
 * @returns An instance of HolySheets configured with OAuth2 authentication.
 */
export default async function initializeHolySheets(): Promise<
  HolySheets<{ Name: string; Age: string }>
> {
  // Validate environment variables
  if (!spreadsheetId) {
    throw new Error(
      'SPREADSHEET_ID is not defined in the environment variables.'
    )
  }
  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error('One or more OAuth2 environment variables are missing.')
  }

  // Initialize OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  )
  console.log('OAuth2 client initialized successfully.')
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  // Create an instance of HolySheets
  const sheets = new HolySheets({
    spreadsheetId,
    auth: oauth2Client
  })

  // Define the table (sheet) to operate on
  const table = sheets.base<{ Name: string; Age: string }>('holysheets')

  return table
}
