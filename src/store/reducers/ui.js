import { OPEN_DIALOG } from 'store/actions/ui'
import { CLOSE_DIALOG } from 'store/actions/ui'

const initialUIState = {
  dialog: {
    category: '',
    edit: false,
    itemId: null,
    open: false,
    operationSuccess: false
  }
}

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: {
          category: action.category,
          edit: action.edit,
          itemId: action.itemId,
          open: true,
          operationSuccess: false
        }
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          itemId: null,
          open: false,
          operationSuccess: action.operationSuccess
        }
      }
    default:
      return state
  }
}

export default ui