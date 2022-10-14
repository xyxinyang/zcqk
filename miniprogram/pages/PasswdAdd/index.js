// pages/PasswdAdd/index.js
const db=wx.cloud.database().collection("Password")
const base=wx.cloud.database()
let state=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'',
  },
  submit:function(res){
    console.log(res)
    let owner=this.data.owner
    let {what,user,passwd}=res.detail.value;
    //检查
    db.where({
      owner:owner,
      what:what,
      user:user
    }).get().then(res=>{
      console.log(res.data)
      if(res.data.length==0) state=true
      else state=false
    }).then(res=>{
      if(state) db.add({
        data:{
          owner:owner,
          what:what,
          user:user,
          passwd:passwd
        },
        success(res){
          wx.showToast({
            title: '添加成功',
            icon:'none',
            duration:2000
          })
          wx.reLaunch({
            url: '../MainPage/index',
          })
        }
      })
      else wx.showToast({
        title: '已存在',
        icon:'none',
        duration:2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options.owner)
    if(options.owner!=undefined)
    {
      that.setData({
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