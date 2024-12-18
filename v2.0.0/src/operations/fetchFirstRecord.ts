import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'
/**
 * Fetches the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function fetchFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }

  try {
    // Include metadata in the fetch operation
    const record = await table.findFirst(
      { where: criteria },
      { includeMetadata: true }
    )
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
