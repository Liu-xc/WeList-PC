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

function changeUserInfo (state, info) {
  state.userInfo = Object.assign(state.userInfo, info)
}

function clearUserInfo (state) {
  state.userInfo = {}
}

export { clearTITE, clearSITE, clearLITE, changeLogStatus, changeUserInfo, clearUserInfo }
