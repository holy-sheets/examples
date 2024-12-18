import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'

/**
 * Inserts multiple records into the spreadsheet.
 *
 * @param table - The HolySheets table instance.
 */
export default async function insertRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const recordsToInsert = [
    { Name: 'Alice', Age: '30' },
    { Name: 'Bob', Age: '25' },
    { Name: 'Charlie', Age: '35' }
  ]

  try {
    // Include metadata in the insert operation
    const result = await table.insert(
      { data: recordsToInsert },
      { includeMetadata: true }
    )
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
