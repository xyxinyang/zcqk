// pages/How/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version:'1.0.2',
    versioninfo:[['增加了相册删除功能','增加了上次登录的记录']],   //从1.0.1开始记录，一个大版本是一个数组
    userA:'',
    userB:''
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