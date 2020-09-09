function setOrderByCreateTime (list) {
  if (list.length) {
    list = list.sort((a, b) => (parseInt(b.createTime) - parseInt(a.createTime)))
  }
  return list
}

function pushAndSort (list1, list2) {
  list1.push(...list2)
  return setOrderByCreateTime(list1)
}

export { setOrderByCreateTime, pushAndSort }
