// pages/Photo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHeightMode: true,
    screenWidth: 1000,
    screenHeight: 1000,
    zcnum:0,
    qknum:0,
    name:"photo",
    produtctdtl: {},
    yynewspic: [],
    mediaList:[],
    licensePicHidden: true,
    cghtPicHidden: true,
    zfpwPicHidden: true,
    wthtPicHidden: true,
    bossmanPicHidden: true,
    productId: ""
  },
  toadd(){
    let that = this;
    let qknum = this.data.qknum;
    qknum++;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(res=>{
      let path = 'qk' + qknum + '.jpg'
      //that.data.imgpath=path
      let toupath="cloud://test-1ed495.7465-test-1ed495-1259259172/zcqk/"+ path
      wx.cloud.uploadFile({
        cloudPath: 'zcqk/' + path, // 上传至云端的路径
        filePath: res.tempFilePaths[0], // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          wx.cloud.callFunction({
            name:"update",
            data:{
              choice:5,
              setname:'Photo',
              name:that.data.name,
              qknum:qknum
            }
          })
          wx.redirectTo({
            url: '../Photo/index',
          })
          //console.log(qknum)
          console.log(res.fileID)
        },
        fail:res=>{ console.error }
      })
    })
  },
  previewImage(e) {
    //console.log(e)
    let {
      sources,
      index
    } = e.currentTarget.dataset
    wx.previewMedia({
      sources,
      current: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Photo'
      },
      success:res=>{
        //console.log(res.result.data[0])
        let data = res.result.data[0];
        that.setData({
          zcnum:data.zc,
          qknum:data.qk
        })
        let templist = []
        for(let i=1;i<=that.data.zcnum;i++){
          let url = 'cloud://test-1ed495.7465-test-1ed495-1259259172/zcqk/zc'+ i + '.jpg'
          templist.push({
            url:url
          })
        }
        for(let i=1;i<=that.data.qknum;i++){
          let url = 'cloud://test-1ed495.7465-test-1ed495-1259259172/zcqk/qk'+ i + '.jpg'
          templist.push({
            url:url
          })
        }
        that.setData({
          mediaList:templist
        })
        console.log(that.data.mediaList)
        console.log(that.data.qknum)
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