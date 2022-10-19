// pages/How/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version:'1.0.6',
    versioninfo:[['最初版本','增加了相册删除功能','增加了上次登录的记录','增加了版本信息说明','修复了记账数值显示bug','修复了记账底部跳转bug','修复了userA留言问题和记账键盘bug']],   
    //从1.0.0开始记录，一个大版本是一个数组
    userA:'',
    userB:''
  },
  showdetails(){
    let text = ''
    let infos = this.data.versioninfo
    for(let i=0;i<infos.length;i++){
      for(let j=0;j<infos[i].length;j++){
         text += 'v1.' + i + '.' + j + ' ' + infos[i][j] + '\n'
      }
    }
    wx.navigateTo({
      url: '../Log/index?infos='+text+'&version='+this.data.version,
    })
    //console.log(text)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userA:app.globalData.userA,
      userB:app.globalData.userB,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})