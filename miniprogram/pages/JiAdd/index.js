// pages/JiAdd/index.js
const db=wx.cloud.database().collection("Money")
const base=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    owner:'',
    ru:true,
    items:[
      {value:0,name:"支出"},
      {value:1,name:"收入"}
    ]
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items,
      ru:e.detail.value=='1'?true:false
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  submit:function(res){
    console.log(res.detail)
    let {detail,count,date}=res.detail.value;
    let ru=this.data.ru,owner=this.data.owner;
    db.add({
      data:{
        owner:owner,
        ru:ru,
        detail:detail,
        count:count,
        date:date
      },success(res){
        wx.showToast({
          title: '添加成功',
          icon:'none',
          duration:2000
        }),
        wx.reLaunch({
          url: '../Jizhang/index?user='+owner,
        })
    }
  })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if(options.owner!=undefined)
    {
      that.setData({
        owner:options.owner,
        date:options.date
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