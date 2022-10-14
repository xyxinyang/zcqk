// pages/Jizhang/index.js
const db=wx.cloud.database().collection("Money")
const base=wx.cloud.database()
var util = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'zc',
    screenWidth: 1000,
    screenHeight: 1000,
    date:'2016-09',
    serverdate:'',
    year:'',
    month:'',
    day:'',
    ru:0,
    chu:0,
    jing:0,
    datalist:[],
    list:[{
      "pagePath": "/pages/JiAdd/index",
      "text": "记账",
      "selectedIconPath": "/images/humi-project.png"    
    },{
      "pagePath": "/pages/Jizhang/index",
      "text": "明细",
    },{
      "pagePath":"/pages/TuBiao/index",
      "text":"图表"
    }]
  },
  tabChange: function(e) {
    console.log(e)
    if(e.detail.index==0) this.toadd()
    else wx.navigateTo({
      url: e.detail.item.pagePath
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  toadd(){
    wx.navigateTo({
      url: '../JiAdd/index?owner='+this.data.user+'&date='+this.data.serverdate,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        text: '修改',
      },{
        type: 'warn',
        text: '删除',
        extClass: 'test',
      }],
  });
    let date = new Date();
    let month = date.getMonth()+1;
    if(month<10) month='0'+month
    var that=this
    this.setData({
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate(),
      date:date.getFullYear()+'-'+ month,
      serverdate:date.getFullYear() +'-'+ month + '-' + date.getDate()
    })
    if(options.user!=undefined)
    {
      that.setData({
        user:options.user
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
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Money'
      },
      success:res=>{
        let data=res.result.data
        let userdata=[]
        let ru=0,chu=0
        //console.log(that.data.user)
        for(let i=0;i<data.length;i++)
        {
          if(data[i].owner==that.data.user) {
            userdata.push(data[i])
            if(data[i].ru) ru+=Number(data[i].count)
            else chu+=Number(data[i].count)
          }
        }
        let jing=ru-chu;
        that.setData({
          ru:ru,
          chu:chu,
          jing:jing,
          datalist:userdata
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