import { google } from 'googleapis'
import HolySheets from 'holysheets'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Retrieve necessary environment variables
const spreadsheetId = process.env.SPREADSHEET_ID as string
const serviceAccountCredentials = JSON.parse(
  process.env.SERVICE_ACCOUNT_CREDENTIALS as string
)

/**
 * Helper function to log metadata
 *
 * @param metadata - Metadata object returned by operations
 */
async function logMetadata(metadata: any) {
  console.log('📄 Metadata:', metadata)
}

/**
 * Initializes the HolySheets instance with Google authentication.
 *
 * @returns A HolySheets instance configured with authentication.
 */
async function initializeHolySheets(): Promise<
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

/**
 * Inserts multiple records into the spreadsheet.
 *
 * @param table - The HolySheets table instance.
 */
async function insertRecords(table: HolySheets<{ Name: string; Age: string }>) {
  const recordsToInsert = [
    { Name: 'Alice', Age: '30' },
    { Name: 'Bob', Age: '25' },
    { Name: 'Charlie', Age: '35' }
  ]

  try {
    // Include metadata in the insert operation
    const result = await table.insert({ data: recordsToInsert }, { includeMetadata: true })
    console.log('✅ Records inserted successfully:')
    recordsToInsert.forEach(record =>
      console.log(`   - ${record.Name}, Age: ${record.Age}`)
    )
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error inserting records:', error)
  }
}

/**
 * Fetches the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function fetchFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }

  try {
    // Include metadata in the fetch operation
    const record = await table.findFirst({ where: criteria }, { includeMetadata: true })
    if (record) {
      console.log('✅ First matching record found:', record.data)
      // Log metadata
      await logMetadata(record.metadata)
    } else {
      console.log('ℹ️ No matching record found for criteria:', criteria)
    }
  } catch (error) {
    console.error('❌ Error fetching first record:', error)
  }
}

/**
 * Fetches all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function fetchMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }

  try {
    // Include metadata in the fetch operation
    const records = await table.findMany({ where: criteria }, { includeMetadata: true })
    if (records && records.data && records.data.length > 0) {
      console.log(`✅ ${records.data.length} record(s) found:`)
      records.data.forEach((record: { Name: string; Age: string }) =>
        console.log(`   - Row: `, record)
      )
      // Log metadata
      await logMetadata(records.metadata)
    } else {
      console.log('ℹ️ No matching records found for criteria:', criteria)
    }
  } catch (error) {
    console.error('❌ Error fetching multiple records:', error)
  }
}

/**
 * Updates the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function updateFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }
  const updatedData = { Age: '31' }

  try {
    // Include metadata in the update operation
    const result = await table.updateFirst({ where: criteria, data: updatedData }, { includeMetadata: true })
    console.log(
      '✅ First matching record updated successfully:',
      result.data
    )
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error updating first record:', error)
  }
}

/**
 * Updates all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function updateMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }
  const updatedData = { Age: '32' }

  try {
    // Include metadata in the update operation
    const result = await table.updateMany({ where: criteria, data: updatedData }, { includeMetadata: true })
    console.log('✅ All matching records updated successfully:', updatedData)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error updating multiple records:', error)
  }
}

/**
 * Deletes the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function deleteFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Bob' }

  try {
    // Include metadata in the delete operation
    const result = await table.deleteFirst({ where: criteria }, { includeMetadata: true })
    console.log(
      '✅ First matching record deleted successfully for:',
      criteria
    )
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error deleting first record:', error)
  }
}

/**
 * Deletes all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
async function deleteMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = {
    Name: {
      in: ['Alice', 'Charlie']
    }
  }

  try {
    // Include metadata in the delete operation
    const result = await table.deleteMany({ where: criteria }, { includeMetadata: true })
    console.log('✅ All matching records deleted successfully for:', criteria)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error deleting multiple records:', error)
  }
}

/**
 * Main function to execute all operations sequentially.
 */
async function executeAllOperations() {
  const table = await initializeHolySheets()

  console.log('📄 Starting HolySheets operations...\n')

  // 1. Insert Records
  await insertRecords(table)

  // 2. Fetch First Matching Record
  await fetchFirstRecord(table)

  // 3. Fetch Multiple Matching Records
  await fetchMultipleRecords(table)

  // 4. Update First Matching Record
  await updateFirstRecord(table)

  // 5. Update Multiple Matching Records
  await updateMultipleRecords(table)

  // 6. Delete First Matching Record
  await deleteFirstRecord(table)

  // 7. Delete Multiple Matching Records
  await deleteMultipleRecords(table)

  console.log('🎉 All operations completed.')
}

// Execute operations
executeAllOperations()