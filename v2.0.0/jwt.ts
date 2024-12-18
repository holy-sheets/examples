import initializeHolySheets from './src/initializeWithJWT'
import insertRecords from './src/operations/insertRecords'
import fetchFirstRecord from './src/operations/fetchFirstRecord'
import fetchMultipleRecords from './src/operations/fetchMultipleRecords'
import updateFirstRecord from './src/operations/updateFirstRecord'
import updateMultipleRecords from './src/operations/updateMultipleRecords'
import deleteFirstRecord from './src/operations/deleteFirstRecord'
import deleteMultipleRecords from './src/operations/deleteMultipleRecords'

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
