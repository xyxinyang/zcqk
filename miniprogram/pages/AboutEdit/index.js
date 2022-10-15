// pages/AboutEdit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namevalue:'',
    detailvalue:'',
    list:[],
    choice:1,
    index:0,
  },
  add1(user,list,name,detail,index){
    list[index].name=name;
    list[index].detail=detail
    wx.cloud.callFunction({
      name:"update",
      data:{
        choice:7,
        setname:'About',
        name:user,
        infos:list
      },
      success:res=>{
        wx.redirectTo({
          url: '../About/index',
        })
      }
    })
},
add2(user,list,name,detail,index){
  list[index].what = name;
  list[index].date = detail;
  wx.cloud.callFunction({
    name:"update",
    data:{
      choice:6,
      setname:'About',
      name:user,
      us:list
    },
    success:res=>{
      wx.redirectTo({
        url: '../About/index',
      })
    }
  })
},
  submit:function(res){
    let that = this;
    let list = this.data.list
    let index = this.data.index
    console.log(that.data.list)
    let {name,detail} = res.detail.value
    if(that.data.choice==1) that.add1('zc',list,name,detail,index)
    else if(that.data.choice==2) that.add1('qk',list,name,detail,index)
    else if(that.data.choice==3) that.add2('us',list,name,detail,index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    let {choice,list,name,detail,index} = options
    list = JSON.parse(list)
    //console.log(choice,list,name,detail)
    this.setData({
      namevalue:name,
      detailvalue:detail,
      choice:choice,
      list:list,
      index:index
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