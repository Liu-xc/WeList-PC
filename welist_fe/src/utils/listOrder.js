function setOrderByCreateTime (list) {
  list = list.sort((a, b) => (parseInt(b.createTime) - parseInt(a.createTime)))
  console.log(list)
  return list
}

function pushAndSort (list1, list2) {
  list1.push(...list2)
  return setOrderByCreateTime(list1)
}

export { pushAndSort }
