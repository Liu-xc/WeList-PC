// clear todoItemToEdit
function clearTITE (state) {
  state.todoItemToEdit = {}
}

// clear logItemToEdit
function clearLITE (state) {
  state.logItemToEdit = {}
}

// clear shareItemToEdit
function clearSITE (state) {
  state.shareItemToEdit = {}
}

function changeLogStatus (state, status) {
  state.logStatus = status
}

export { clearTITE, clearSITE, clearLITE, changeLogStatus }
