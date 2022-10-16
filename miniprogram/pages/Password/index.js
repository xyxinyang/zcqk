// pages/Password/index.js
const db=wx.cloud.database().collection("Password")
const base=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    search:'',
    value:'',
    screenWidth: 10,
    screenHeight: 1000,
    datalist:[],
    searchlist:[]
  },
  toadd(){
    console.log(this.data.user)
    wx.navigateTo({ //choice为1是添加，2是修改
      url: '../PasswdAdd/index?choice=1&owner='+this.data.user,
    })
  },
  onSearch(element){
    let value = element.detail.value
    let datalist = this.data.datalist
    let searchlist = []
    //console.log(element.detail.value)
    this.setData({value})
    for(let i=0;i<datalist.length;i++){
      if(datalist[i].what.includes(value)) searchlist.push(datalist[i])
    }
    this.setData({
      searchlist
    })
  },
  slideButtonTap(element){
    let that=this
    let {index}=element.detail
    let passwdid=element.currentTarget.dataset.index
    let datalist = this.data.datalist
    //console.log(element.currentTarget.dataset.index)
    if(index==0){
     // console.log(datalist[passwdid])
      wx.navigateTo({
        url: '../PasswdAdd/index?choice=2&owner='+that.data.user+'&data='+JSON.stringify(datalist[passwdid]),
      })
    }
    else if(index==1){
      wx.showToast({
        title: '暂未开发，敬请期待',
        icon:'none'
      })
    }
    else if(index==2){
      wx.showModal({
        title: '确定删除？',
        content:'',
        success: function (res) {
          if (res.confirm) {
            let id=that.data.datalist[passwdid]._id
            let owner=that.data.datalist[passwdid].owner
            //console.log(that.data.datalist[passwdid]._id)
            console.log('点击确定')//点击确定事件
            db.doc(id).remove({
              success:function(res){
                wx.redirectTo({
                  url: '../Password/index?user='+owner,
                })
              }
            })
          } else {
            console.log('点击取消')//点击取消事件
          }
        }
      })      
    }
    else if(index==0){

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        text: '修改',
      },{
        text: '置顶',
        extClass: 'test',
      },{
        type: 'warn',
        text: '删除',
        extClass: 'test',
      }],
  });
    var that=this
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
        list:'Password'
      },
      success:res=>{
        let data=res.result.data
        let userdata=[]
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