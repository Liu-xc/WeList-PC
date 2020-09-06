import { setOrderByCreateTime } from '../utils/listOrder'
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
  state.todoList = setOrderByCreateTime(todoList)
}

function setShareList (state, shareList) {
  state.shareList = setOrderByCreateTime(shareList)
}

function setLogList (state, logList) {
  state.logList = setOrderByCreateTime(logList)
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
