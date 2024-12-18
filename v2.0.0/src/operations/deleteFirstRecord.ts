import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'
/**
 * Deletes the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function deleteFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Bob' }

  try {
    // Include metadata in the delete operation
    const result = await table.deleteFirst(
      { where: criteria },
      { includeMetadata: true }
    )
    console.log('✅ First matching record deleted successfully for:', criteria)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error deleting first record:', error)
  }
}
