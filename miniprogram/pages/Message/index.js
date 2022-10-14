// pages/Message/index.js
const db=wx.cloud.database().collection("Message")
const base=wx.cloud.database()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'',
    screenWidth: 1000,
    screenHeight: 1000,
  },
  toadd(){
    wx.navigateTo({
      url: '../MessageAdd/index?owner='+this.data.owner,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that=this
    //console.log(app.globalData._openidB)
    wx.cloud.callFunction({
      name:"getOpenId"
    }).then(res=>{
      //console.log(res.result)
      if(res.result==app.globalData._openidB){
        //console.log('ok')
        that.setData({
          owner:app.globalData.userB
        })
      }
    })
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Message'
      },
      success:res=>{
        let data=res.result.data
        //let userdata=[]
        //console.log(that.data.user)
        // for(let i=0;i<data.length;i++)
        // {
        //   if(data[i].owner==that.data.user) {
        //     userdata.push(data[i])
        //   }
        // }
        that.setData({
          datalist:data
        })
        //console.log(res.result.data)
      }
    })
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