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
    tabbarindex:1,
    screenWidth: 1000,
    screenHeight: 1000,
    date:'2016-09',
    serverdate:'',
    year:'',
    month:'',
    day:'',
    daylist:[0,31,28,31,30,31,30,31,31,30,31,30,31],
    ru:0,
    chu:0,
    jing:0,
    delete1:0,    //要删除的下标1
    datalist:[],   //所有数据
    results:[],    //最终要显示的数据
    nowdatalist:[1],  //本月的数据
    list:[{    //底部导航
      "pagePath": "/pages/JiAdd/index",
      "text": "记账",
      "iconPath":"/images/humi-project.png",
      "selectedIconPath": "/images/humi-project.png"    
    },{
      "pagePath": "/pages/Jizhang/index",
      "text": "明细",
      "iconPath":"/images/detail.png",
      "selectedIconPath": "/images/detail.png"    
    },{
      "pagePath":"/pages/TuBiao/index",
      "text":"账单",
      "iconPath":"/images/year.png",
      "selectedIconPath": "/images/year.png"    
    }]
  },
  tabChange: function(e) {
    console.log(e)
    if(e.detail.index==0) this.toadd()
    else if(e.detail.index==2) this.tozhang()
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let chu = 0
    let ru = 0
    let jing = 0
    let that = this
    let date = e.detail.value
    let month = Number(date.split("-")[1])
    let datalist = this.data.datalist
    let nowdatalist = []
    let results = new Array(31)  //创建二维数组
    for(let i=0;i<results.length;i++) results[i]=[]
    for(let i=0;i<datalist.length;i++){
      if(datalist[i].date.includes(date)){
        //console.log(datalist[i].date)
        let day = Number(datalist[i].date.split("-")[2])
        //console.log(day)
        results[day].push(datalist[i])
        nowdatalist.push(datalist[i]);
        if(datalist[i].ru) ru+=Number(datalist[i].count)
        else chu+=Number(datalist[i].count)
        //console.log(datalist[i]);
      }
    }
    //console.log(month)
    jing = ru - chu
    this.setData({
      ru : Number(ru.toFixed(2)),
      chu : Number(chu.toFixed(2)),
      jing : Number(jing.toFixed(2)),
      nowdatalist:nowdatalist,
      date: e.detail.value,
      results:results,
      month,
      day:that.data.daylist[month]
    })
    //console.log(that.data.day)
  },
  tozhang(){
    wx.navigateTo({
      url: '../TuBiao/index?datalist='+JSON.stringify(this.data.datalist),
    })
  },
  toadd(){
    wx.navigateTo({
      url: '../JiAdd/index?owner='+this.data.user+'&date='+this.data.serverdate,
    })
  },
  getfirst(element){
    //console.log(1,element)
    this.setData({
      delete1:element.currentTarget.dataset.index
    })
  },
  slideButtonTap(element){
    let that=this
    //console.log(2,element)
    let {index}=element.detail
    let id1=this.data.delete1
    let id2=element.currentTarget.dataset.index
    //console.log(id1,id2)
    let want = this.data.results[id1][id2]
    let results = this.data.results
    console.log(want)
    if(index==0){
      wx.showModal({
        title:'确定删除？',
        content:'',
        success:function(res){
          if(res.confirm){
            let id = want._id;
            console.log(id)
            db.doc(id).remove({
              success:function(res){
                results[id1].splice(id2,1)
                that.setData({results})
                // wx.redirectTo({
                //   url: '../Jizhang/index',
                // })
              }
            })
          }
        }
      })
    }
    // if(index==0){
    //   wx.showModal({
    //     title: '确定删除？',
    //     content:'',
    //     success: function (res) {
    //       if (res.confirm) {
    //         let id=that.data.datalist[passwdid]._id
    //         let owner=that.data.datalist[passwdid].owner
    //         //console.log(that.data.datalist[passwdid]._id)
    //         console.log('点击确定')//点击确定事件
    //         db.doc(id).remove({
    //           success:function(res){
    //             wx.redirectTo({
    //               url: '../Password/index?user='+owner,
    //             })
    //           }
    //         })
    //       } else {
    //         console.log('点击取消')//点击取消事件
    //       }
    //     }
    //   })      
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
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
    that.setData({
      tabbarindex:1
    })
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Money'
      },
      success:res=>{
        let data=res.result.data
        let userdata=[]
        let chu = 0
        let ru = 0
        let jing = 0
        //console.log(that.data.user)
        for(let i=0;i<data.length;i++)
        {
          if(data[i].owner==that.data.user) {
            userdata.push(data[i])
          }
        }
        that.setData({
          datalist:userdata
        })
        let date = that.data.date
        let datalist = that.data.datalist
        let nowdatalist = []
        let results = new Array(31)  //创建二维数组
        for(let i=0;i<results.length;i++) results[i]=[]
        for(let i=0;i<datalist.length;i++){
          if(datalist[i].date.includes(date)){
            let day = Number(datalist[i].date.split("-")[2])
            //console.log(day)
            results[day].push(datalist[i])
            nowdatalist.push(datalist[i]);
            if(datalist[i].ru) ru+=Number(datalist[i].count)
            else chu+=Number(datalist[i].count)
            //console.log(datalist[i]);
          }
        }
        //console.log(results)
        jing = ru -chu
        that.setData({
          ru : Number(ru.toFixed(2)),
          chu : Number(chu.toFixed(2)),
          jing : Number(jing.toFixed(2)),
          nowdatalist:nowdatalist,
          results:results,
          day:that.data.daylist[that.data.month]
        })
        //console.log(that.data.datalist)
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