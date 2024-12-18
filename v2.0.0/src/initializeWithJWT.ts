import { google } from 'googleapis'
import dotenv from 'dotenv'
import HolySheets from 'holysheets'

// Load environment variables from .env file
dotenv.config()

// Retrieve necessary environment variables
const spreadsheetId = process.env.SPREADSHEET_ID as string
const serviceAccountCredentials = JSON.parse(
  process.env.SERVICE_ACCOUNT_CREDENTIALS as string
)

/**
 * Initializes the HolySheets instance with Google authentication.
 *
 * @returns A HolySheets instance configured with authentication.
 */
export default async function initializeHolySheets(): Promise<
  HolySheets<{ Name: string; Age: string }>
> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = new HolySheets({
      spreadsheetId,
      auth
    })
    const table = sheets.base<{ Name: string; Age: string }>('holysheets')
    return table
  } catch (error) {
    console.error('Error initializing HolySheets:', error)
    throw error
  }
}
