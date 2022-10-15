// pages/Yima/index.js
const db=wx.cloud.database().collection("Yima")
const base=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateString: "",  //选中日期
    state:0, //0：姨妈来，1：姨妈走，2：安全期，3：易孕期
    today: '',
    ailist:[],  //做爱记录
    spot: [],
    show: false,
    num:0,
    buttons: [{
        type: 'default',
        className: '',
        text: '记录姨妈',
        value: 0
      },{
        type: 'primary',
        className: '',
        text: '记录爱爱',
        value: 1
      }],
      multiArray: [['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'], ['无措施', '避孕套', '避孕药', '体外射精']],
      multiIndex: [0, 0],
      slideButtons:[],
  },
  bindMultiPickerChange: function (e) {   //添加做爱记录
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    let that = this
    let dateString = this.data.dateString
    let state = this.data.state
    let multiArray = this.data.multiArray
    let multiIndex =  e.detail.value
    this.setData({
      multiIndex: e.detail.value
    })
    let ailist = this.data.ailist
    ailist.push({
      date:multiArray[0][multiIndex[0]],
      cuoshi:multiArray[1][multiIndex[1]]
    })
    //console.log(dateString)
    if(state==-1){
      //console.log('-1')
      db.add({
        data:{
          date:dateString,
          ai:ailist
        }
      }).then(res=>{
        that.setData({ailist})
      })
    }
    else wx.cloud.callFunction({
      name:"update",
      data:{
        choice:8,
        setname:'Yima',
        date:dateString,
        ai:ailist
      },
      success:res=>{
        console.log(res)
        that.setData({ailist})
        // wx.redirectTo({
        //   url: '../Yima/index',
        // })
      }
    })
  },
  slideButtonTap(element){   //对做爱记录进行操作
    let that=this
    let date = this.data.dateString
    console.log(element)
    let {index}=element.detail
    let id=element.currentTarget.dataset.index
    if(index==1){  //删除操作
      wx.showModal({
        title: '确定删除？',
        content:'',
        success: function (res) {
          if (res.confirm) {
            let ailist = that.data.ailist;
            ailist.splice(id,1);
            //console.log(us)
            //console.log(that.data.datalist[passwdid]._id)
            //console.log('点击确定')//点击确定事件
            wx.cloud.callFunction({
              name:"update",
              data:{
                choice:8,
                setname:'Yima',
                date:date,
                ai:ailist
              },
              success:res=>{
                that.setData({ailist})
                // wx.redirectTo({
                //   url: '../Yima/index',
                // })
              }
            })
          } else {
            console.log('点击取消')//点击取消事件
          }
        }
      }) 
    }
  },
  dateChange(e) {    //变换当前要看的天
    //console.log(e)
    let num = this.data.num;
    let today = e.detail.dateString;
    //if(num!=0) this.open()
    num++;
    this.setData({
      num,
      dateString: e.detail.dateString,
    })
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      data:{
        list:'Yima'
      },
      success:res=>{
        let data=res.result.data
        let length = res.result.data.length
        //console.log(data)
        //console.log(today)
        let isai = false;
        for(let i=0;i<length;i++){
          if(data[i].date==today){
            console.log(data[i]);
            that.setData({
              ailist:data[i].ai,
              state:data[i].state
            })
            isai = true
            break;
          }
        }
        if(isai==false){
          that.setData({
            ailist:[],
            state:-1
          })
        }
      }
      })
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
    let date = new Date();
    let month = date.getMonth() + 1
    let today = date.getFullYear() + '-' + month + '-' + date.getDate();
    this.setData({
      today
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