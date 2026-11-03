// utils/util.js
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
  return `${year}年${month}月${day}日 星期${week}`;
}

// 导出函数，供其他页面调用
module.exports = {
  formatDate: formatDate
};