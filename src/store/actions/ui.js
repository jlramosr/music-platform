export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export const openDialog = ({ category, edit, itemId }) => ({
  type: OPEN_DIALOG,
  category,
  edit,
  itemId
})

export const closeDialog = () => ({
  type: CLOSE_DIALOG
})