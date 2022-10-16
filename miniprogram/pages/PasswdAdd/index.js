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
    choice:'1',  //1是添加，2是修改
    v1:'',
    v2:'',
    v3:'',
    id:''
  },
  submit:function(res){
    console.log(res)
    let that = this
    let owner=this.data.owner
    let {what,user,passwd}=res.detail.value;
    let choice = this.data.choice;
    let id = this.data.id
    //console.log(choice)
    if(choice=='2'){
      console.log(id)
      wx.cloud.callFunction({
        name:"update",
        data:{
          choice:9,
          setname:'Password',
          id:id,
          what:what,
          user:user,
          passwd:passwd
        },
        success:res=>{
          wx.reLaunch({
            url: '../Password/index?user='+owner,
          })
        }
      })
    }
    //检查
    else db.where({
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
            url: '../Password/index?user='+owner,
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
   // console.log(options.owner)
    if(options.owner!=undefined&&options.choice=='2')
    {
      let data = JSON.parse(options.data)
      //console.log(data)
      that.setData({
        choice:options.choice,
        id:data._id,
        v1:data.what,
        v2:data.user,
        v3:data.passwd,
        owner:options.owner
      })
    }
    else if(options.owner!=undefined){
      that.setData({
        choice:options.choice,
        owner:options.owner
      })
    }
    //console.log(that.data.v1)
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