import HolySheets from 'holysheets'
import logMetadata from '../helpers/logMetadata'
/**
 * Updates the first record that matches the specified criteria.
 *
 * @param table - The HolySheets table instance.
 */
export default async function updateFirstRecord(
  table: HolySheets<{ Name: string; Age: string }>
) {
  const criteria = { Name: 'Alice' }
  const updatedData = { Age: '31' }

  try {
    // Include metadata in the update operation
    const result = await table.updateFirst(
      { where: criteria, data: updatedData },
      { includeMetadata: true }
    )
    console.log('✅ First matching record updated successfully:', result.data)
    // Log metadata
    await logMetadata(result.metadata)
  } catch (error) {
    console.error('❌ Error updating first record:', error)
  }
}
