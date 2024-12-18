import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'
/**
 * Deletes all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function deleteMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = {
    Name: {
      in: ['Alice', 'Charlie']
    }
  }

  try {
    // Include metadata in the delete operation
    const result = await table.deleteMany(
      { where: criteria },
      { includeMetadata: true }
    )
    console.log('✅ All matching records deleted successfully for:', criteria)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error deleting multiple records:', error)
  }
}
