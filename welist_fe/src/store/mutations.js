import { pushAndSort } from '../utils/listOrder'
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

function setTodoList (state, todoList) {
  state.todoList = pushAndSort(state.todoList, todoList)
}

function setShareList (state, shareList) {
  state.shareList = pushAndSort(state.shareList, shareList)
}

function setLogList (state, logList) {
  state.logList = pushAndSort(state.logList, logList)
}

export {
  clearTITE,
  clearSITE,
  clearLITE,
  changeLogStatus,
  changeUserInfo,
  clearUserInfo,
  setTodoList,
  setShareList,
  setLogList
}
