// pages/About/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zclast:'',
    qklast:'',
    zcinfos:[],
    zcothers:[],
    qkinfos:[],
    qkothers:[],
    us:[],
    usid:'a7f54ea2634a263d00ba924f24b233e1',
    slideButtons:[],
  },
  toadd1(){
    console.log(this.data.zcothers)
    wx.navigateTo({
      //JSON转换传递参数
      url: '../AboutAdd/index?choice=1&list='+JSON.stringify(this.data.zcothers),
    })
  },
  toadd2(){
    console.log(this.data.qkothers)
    wx.navigateTo({
      //JSON转换传递参数
      url: '../AboutAdd/index?choice=2&list='+JSON.stringify(this.data.qkothers),
    })
  },
  toadd3(){
    console.log(this.data.us)
    wx.navigateTo({
      //JSON转换传递参数
      url: '../AboutAdd/index?choice=3&list='+JSON.stringify(this.data.us),
    })
  },
  edit1(name,detail,index){
    wx.navigateTo({
      url:'../AboutEdit/index?choice=1&list='+JSON.stringify(this.data.zcothers)+'&name='+name+'&detail='+detail+'&index='+index,
    })
  },
  edit2(name,detail,index){
    wx.navigateTo({
      url:'../AboutEdit/index?choice=2&list='+JSON.stringify(this.data.qkothers)+'&name='+name+'&detail='+detail+'&index='+index,
    })
  },
  edit3(name,detail,index){
    wx.navigateTo({
      url:'../AboutEdit/index?choice=3&list='+JSON.stringify(this.data.us)+'&name='+name+'&detail='+detail+'&index='+index,
    })
  },
  slideButtonTap1(element){
    let that=this
    let {index}=element.detail
    let infoid=element.currentTarget.dataset.index
    //console.log(element)
    if(index==0){
      let {name,detail} = that.data.zcothers[infoid];
      console.log(that.data.zcothers[infoid])
      that.edit1(name,detail,infoid)
    }
    else if(index==1){
      wx.showModal({
        title: '确定删除？',
        content:'',
        success: function (res) {
          if (res.confirm) {
            let zcothers = that.data.zcothers;
            zcothers.splice(infoid,1);
            //console.log(zcothers)
            //console.log(that.data.datalist[passwdid]._id)
            console.log('点击确定')//点击确定事件
            wx.cloud.callFunction({
              name:"update",
              data:{
                choice:7,
                setname:'About',
                name:'zc',
                infos:zcothers
              },
              success:res=>{
                wx.redirectTo({
                  url: '../About/index',
                })
              }
            })
          } else {
            console.log('点击取消')//点击取消事件
          }
        }
      }) 
    }
  },
  slideButtonTap2(element){
    let that=this
    let {index}=element.detail
    let infoid=element.currentTarget.dataset.index
    //console.log(element)
    if(index==0){
      let {name,detail} = that.data.qkothers[infoid];
      console.log(that.data.qkothers[infoid])
      that.edit2(name,detail,infoid)
    }
    else if(index==1){
      wx.showModal({
        title: '确定删除？',
        content:'',
        success: function (res) {
          if (res.confirm) {
            let qkothers = that.data.qkothers;
            qkothers.splice(infoid,1);
            //console.log(qkothers)
            //console.log(that.data.datalist[passwdid]._id)
            console.log('点击确定')//点击确定事件
            wx.cloud.callFunction({
              name:"update",
              data:{
                choice:7,
                setname:'About',
                name:'qk',
                infos:qkothers
              },
              success:res=>{
                wx.redirectTo({
                  url: '../About/index',
                })
              }
            })
          } else {
            console.log('点击取消')//点击取消事件
          }
        }
      }) 
    }
  },
  slideButtonTap3(element) {
    let that=this
    //console.log(element)
    let {index}=element.detail
    let usid=element.currentTarget.dataset.index
    if(index==0){
      let {what,date} = that.data.us[usid];
      console.log(that.data.us[usid])
      that.edit3(what,date,usid)
    }
    else if(index==1){
      wx.showModal({
        title: '确定删除？',
        content:'',
        success: function (res) {
          if (res.confirm) {
            let us = that.data.us;
            us.splice(usid,1);
            //console.log(us)
            //console.log(that.data.datalist[passwdid]._id)
            console.log('点击确定')//点击确定事件
            wx.cloud.callFunction({
              name:"update",
              data:{
                choice:6,
                setname:'About',
                name:'us',
                us:us
              },
              success:res=>{
                wx.redirectTo({
                  url: '../About/index',
                })
              }
            })
          } else {
            console.log('点击取消')//点击取消事件
          }
        }
      }) 
    }
    //console.log(element.currentTarget.dataset.index)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        text: '编辑',
      },{
        type: 'warn',
        text: '删除',
        extClass: 'test',
      }],
  });
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'About'
      },
      success:res=>{
        console.log(res.result.data)
        let zcinfos,qkinfos,zcothers,qkothers,us
        for(let i=0;i<3;i++){
          if(res.result.data[i].name=='zc'){
            zcinfos = res.result.data[i]
            zcothers = res.result.data[i].infos;
          }else if(res.result.data[i].name=='qk'){
            qkinfos = res.result.data[i]
            qkothers = res.result.data[i].infos;
          }else if(res.result.data[i].name=='us'){
            us = res.result.data[i].us;
          }
        }
        // let zcinfos = res.result.data[0];
        // let qkinfos = res.result.data[1];
        // let zcothers = res.result.data[0].infos;
        // let qkothers = res.result.data[1].infos;
        // let us = res.result.data[2].us;
        //console.log(zcothers)
        that.setData({
          qkinfos,zcinfos,zcothers,qkothers,us
        })
      }
    })
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'UserList'
      },
      success:res=>{
        let zclast  = res.result.data[0].last;
        let qklast = res.result.data[1].last;
        that.setData({zclast,qklast})
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