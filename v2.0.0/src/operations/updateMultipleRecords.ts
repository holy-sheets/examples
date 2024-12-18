import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'
/**
 * Updates all records that match the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function updateMultipleRecords(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }
  const updatedData = { Age: '32' }

  try {
    // Include metadata in the update operation
    const result = await table.updateMany(
      { where: criteria, data: updatedData },
      { includeMetadata: true }
    )
    console.log('✅ All matching records updated successfully:', updatedData)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error updating multiple records:', error)
  }
}
