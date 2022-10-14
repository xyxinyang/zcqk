// pages/Goat/index.js
const db=wx.cloud.database().collection("Goat")
const base=wx.cloud.database()
var util = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcMic:'./videos/mie.mp3',
    name:'miemie',
    level:0,
    ji:0,
    clean:0,
    lastji:'',
    lastclean:'',
    last:'',
  },
  miemie(){
    let that = this
    //创建内部 audio 上下文 InnerAudioContext 对象。
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true
    });
    innerAudioContext.src = 'cloud://test-1ed495.7465-test-1ed495-1259259172/mie.mp3' //设置音频地址
    innerAudioContext.play(); //播放音频
    console.log(innerAudioContext)
  },
  addji(e){
    let that=this;
    let cha= that.datediff(that.data.lastji);
    if(cha>0){
      let ji = this.data.ji;
      let date = util.formatTime(new Date(),3);
      if(ji<=90) ji+=10;
      else ji=100;
      this.setData({
        ji:ji,
        lastji:date
      })
      wx.cloud.callFunction({
        name:"update",
        data:{
          choice:2,
          setname:'Goat',
          name:that.data.name,
          ji:ji,
          lastji:date
        },
        success:res=>{
          wx.showToast({
            title: '喂养成功',
            icon: 'success',//图标，支持"success"、"loading"、"none"
            duration: 1000//设置的持续时间
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '今天已经喂养过了',
        icon: 'none',//图标，支持"success"、"loading"、"none"
        duration: 1000//设置的持续时间
      })
    }
  },
  addclean(e){
    let that=this;
    //console.log(that.data.lastclean)
    let cha= that.datediff(that.data.lastclean);
    if(cha>0){
      let clean = this.data.clean;
      let date = util.formatTime(new Date(),3);
      if(clean<=90) clean+=10;
      else clean=100;
      this.setData({
        clean:clean,
        lastclean:date
      })
      wx.cloud.callFunction({
        name:"update",
        data:{
          choice:3,
          setname:'Goat',
          name:that.data.name,
          clean:clean,
          lastclean:date
        },
        success:res=>{
          wx.showToast({
            title: '给羊羊洗澡成功',
            icon: 'success',//图标，支持"success"、"loading"、"none"
            duration: 1000//设置的持续时间
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '今天已经洗过了',
        icon: 'none',//图标，支持"success"、"loading"、"none"
        duration: 1000//设置的持续时间
      })
    }
  },
  //计算时间差
  datediff(end){
    let today = new Date();	
    let days;
	end = new Date(end);
	if(end > today){
		days = parseInt(Math.abs(end - today) / 1000 / 60 / 60 / 24);
	}else{
		days = parseInt(Math.abs(end - today) / 1000 / 60 / 60 / 24); // 如果不限制对比时间和当前时间大小可以不用if
	}	
	return days;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Goat'
      },
      success:res=>{
        //console.log(res.result.data[0])
        let {ji,clean,level,lastji,lastclean,last}=res.result.data[0]
        // let jicha = this.datediff(lastji)
        // console.log(jicha,ji)
        // let cleancha = this.datediff(lastclean)
        let cha = this.datediff(last)
        let date = util.formatTime(new Date(),3);
        if(cha>0){
          let temp = cha;
          for(temp;temp>0;temp--){
            if(ji>0) ji-=10;
            if(clean>0) clean-=10;
          }
        }
        if(cha>0&&ji>0&&clean>0) {level++;console.log(level)}
        wx.cloud.callFunction({
          name:"update",
          data:{
            choice:4,
            setname:'Goat',
            name:that.data.name,
            clean:clean,
            ji:ji,
            last:date,
            level:level
          },
          success:res=>{}
        })
        that.setData({
          ji,clean,level,last,lastclean,lastji
        })
        console.log(this.data.last)
      }
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