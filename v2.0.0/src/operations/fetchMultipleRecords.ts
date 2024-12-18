import logMetadata from '../helpers/logMetadata'
import HolySheets from 'holysheets'

/**
 * Fetches all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function fetchMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = {}

  try {
    // Include metadata in the fetch operation
    const records = await table.findMany(
      { where: criteria },
      { includeMetadata: true }
    )
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
