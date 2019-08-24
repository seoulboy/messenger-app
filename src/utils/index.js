export const sortByRecentMsg = messageList => {
  return messageList.sort((a, b) => {
    let aTime = Date.parse(a[1][a[1].length - 1].time);
    let bTime = Date.parse(b[1][b[1].length - 1].time);
    return bTime - aTime;
  });
};

export const changeSortedRecentMsgListToObj = sortable => {
  return sortable.reduce((acc, curr, i) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});
};
