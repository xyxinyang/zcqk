// pages/MessageAdd/index.js
const db=wx.cloud.database().collection("Message")
const base=wx.cloud.database()
var util = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'',
    date:''
  },
  submit:function(res){
    console.log(res.detail)
    let owner=this.data.owner
    console.log(this.data.owner)
    let date = util.formatTime(new Date(),2);
    console.log(date)
    let {textarea}=res.detail.value
    db.add({
      data:{
        owner:owner,
        content:textarea,
        date:date
      },success(res){
        wx.showToast({
          title: '添加成功',
          icon:'none',
          duration:2000
        }),
        wx.reLaunch({
          url: '../Message/index?user='+owner,
        })
    }
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.owner!=undefined)
    {
      this.setData({
        owner:options.owner
      })
    }
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