// pages/TuBiao/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:2022,   //需要是string
    datalist:[],
    isshow:[false,true,true,true,true,true,true,true,true,true,true,true,true],
    jing:[0,0,0,0,0,0,0,0,0,0,0,0,0],    //最终要显示的数据
    chu:[0,0,0,0,0,0,0,0,0,0,0,0,0],
    ru:[0,0,0,0,0,0,0,0,0,0,0,0,0],
    alljing:0,
    allchu:0,
    allru:0
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let year = Number(e.detail.value)
    let  isshow=[false,true,true,true,true,true,true,true,true,true,true,true,true]
    let jing=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let ru=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let chu=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let alljing=0
    let allru=0
    let allchu=0
    let datalist = this.data.datalist
    this.change(datalist,chu,ru,jing,isshow,year,alljing,allru,allchu)
  },
  change(datalist,chu,ru,jing,isshow,year,alljing,allru,allchu){
    alljing=0
    allru=0
    allchu=0
    for(let i=0;i<datalist.length;i++){
      if(datalist[i].date.includes(year)){
        let month = Number(datalist[i].date.split("-")[1])
        //console.log(month)
        if(datalist[i].ru) ru[month]+=Number(datalist[i].count)
        else chu[month]+=Number(datalist[i].count)
      }
    }
    for(let i=0;i<13;i++) {
      if(ru[i]==0&&chu[i]==0) isshow[i]=false
      jing[i]=ru[i]-chu[i]
    }
    for(let i=0;i<13;i++){
      alljing+=jing[i]
      allru+=ru[i]
      allchu+=chu[i]
    }
    this.setData({year:String(year),jing,chu,ru,alljing,allru,allchu})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let year = new Date().getFullYear()
    let  isshow=[false,true,true,true,true,true,true,true,true,true,true,true,true]
    let jing=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let ru=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let chu=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    let alljing=0
    let allru=0
    let allchu=0
    //console.log(year)
    let datalist = JSON.parse(options.datalist)
    this.setData({datalist})
    this.change(datalist,chu,ru,jing,isshow,year,alljing,allru,allchu)
    //console.log(jing)
    //console.log(datalist)
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