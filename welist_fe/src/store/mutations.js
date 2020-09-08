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
  if (state.likeList.length && state.shareList) {
    _handleLikeList(state)
  }
}

function setLogList (state, logList) {
  state.logList = setOrderByCreateTime(logList)
}

function setLikeList (state, likeList) {
  state.likeList = likeList
  // if (state.likeList.length && state.shareList) {
  //   _handleLikeList(state)
  // }
}

function setShareItemToEdit (state, shareid) {
  const len = state.shareList.length
  for (let i = 0; i < len; i++) {
    if (state.shareList[i].shareid === shareid) {
      state.shareItemToEdit = state.shareList[i]
      break
    }
  }
}

function setTodoItemToEdit (state, todoid) {
  const len = state.todoList.length
  for (let i = 0; i < len; i++) {
    if (state.todoList[i].todoid === todoid) {
      state.todoItemToEdit = state.todoList[i]
      break
    }
  }
}

function setLogItemToEdit (state, logid) {
  const len = state.logList.length
  for (let i = 0; i < len; i++) {
    if (state.logList[i].logid === logid) {
      state.logItemToEdit = state.logList[i]
      break
    }
  }
}

function _handleLikeList (state) {
  const shareLen = state.shareList.length
  const likeLen = state.likeList.length

  // 对获取到的分享列表进行处理
  // 对用户身份进行分辨，对应渲染图标以及能够执行的操作
  for (let i = 0; i < shareLen; i++) {
    for (let j = 0; j < likeLen; j++) {
      if (state.shareList[i].shareid === state.likeList[j].shareid) {
        // 如果在喜欢列表中出现则说明不是作者，同时喜欢了分享
        state.shareList[i] = Object.assign(state.shareList[i], { like: true })
        state.shareList[i] = Object.assign(state.shareList[i], { author: false })
        // 如果有满足条件的直接退出本次子循环，避免被覆盖
        break
      } else if (state.shareList[i].userUname === state.userInfo.uname) {
        // 如果没有在喜欢列表中出现但分享所属用户与当前用户对应，则说明是作者
        state.shareList[i] = Object.assign(state.shareList[i], { like: false })
        state.shareList[i] = Object.assign(state.shareList[i], { author: true })
        // 如果有满足条件的直接退出本次子循环，避免被覆盖
        break
      } else {
        // 如果上述两种情况都不满足则说明既不是用户也不是喜欢的
        state.shareList[i] = Object.assign(state.shareList[i], { like: false })
        state.shareList[i] = Object.assign(state.shareList[i], { author: false })
        // 在这里不退出子循环，因为下一次循环可能满足上面两种情况
      }
    }
  }
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
  setLogList,
  setLikeList,
  setShareItemToEdit,
  setTodoItemToEdit,
  setLogItemToEdit
}
