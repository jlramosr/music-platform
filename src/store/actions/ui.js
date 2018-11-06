export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export const openDialog = params => ({
  type: OPEN_DIALOG,
  ...params
})

export const closeDialog = operationSuccess => ({
  type: CLOSE_DIALOG,
  operationSuccess
})