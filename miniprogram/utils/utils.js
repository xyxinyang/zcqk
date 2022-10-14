function formatTime(date,choice) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if(choice==0)  return [year, month, day].map(formatNumber).join('/')  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
  else if(choice==1) return [year, month, day].map(formatNumber).join('/')   + ' ' + [hour, minute].map(formatNumber).join(':')
  else return [year, month, day].map(formatNumber).join('-')   + ' ' + [hour, minute].map(formatNumber).join(':')
}
 
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 
module.exports = {
  formatTime: formatTime
}
