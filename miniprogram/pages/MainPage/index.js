/* Main page of the app */
var app = getApp()
var util = require('../../utils/utils.js')
Page({
    data: {
        creditA: 0,
        creditAA:0,
        creditB: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        timecount: '00:00:00',
        userA: '',
        userB: '',
        bizhi:['cloud://test-1ed495.7465-test-1ed495-1259259172/1.jpg','cloud://test-1ed495.7465-test-1ed495-1259259172/2.jpg','cloud://test-1ed495.7465-test-1ed495-1259259172/3.jpg']
    },

    async onShow() {
        this.getCreditA()
        this.getCreditB()
        this.setData({
            userA: getApp().globalData.userA,
            userB: getApp().globalData.userB,
        })
    },

    getCreditA() {
        wx.cloud.callFunction({
                name: 'getElementByOpenId',
                data: {
                    list: getApp().globalData.collectionUserList,
                    _openid: getApp().globalData._openidA
                }
            })
            .then(res => {
                this.setData({
                    creditA: res.result.data[0].credit
                })
            })
    },

    getCreditB() {
        wx.cloud.callFunction({
                name: 'getElementByOpenId',
                data: {
                    list: getApp().globalData.collectionUserList,
                    _openid: getApp().globalData._openidB
                }
            })
            .then(res => {
                this.setData({
                    creditB: res.result.data[0].credit
                })
            })
    },
    topasswd() {
        wx.showActionSheet({
            itemList: ['zc', 'qk'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex) //点击选择按钮，打印
                }
                if (res.tapIndex == 0) {
                    wx.navigateTo({
                        url: '../Password/index?user=zc',
                    })
                } else if (res.tapIndex == 1) {
                    wx.navigateTo({
                        url: '../Password/index?user=qk',
                    })
                }
            }
        })
        // wx.navigateTo({
        //   url: '../Password/index',
        //   success: (result) => {},
        //   fail: (res) => {},
        //   complete: (res) => {},
        // })
    },
    toMessage() {
        wx.navigateTo({
            url: '../Message/index',
        })
    },
    tophoto() {
        wx.navigateTo({
            url: '../Photo/index',
        })
    },
    tobeiwang() {
        wx.navigateTo({
            url: '../BeiWang/index',
        })
    },
    toyima() {
        wx.navigateTo({
            url: '../Yima/index',
        })
    },
    togoat() {
        wx.navigateTo({
            url: '../Goat/index',
        })
    },
    toabout() {
        wx.navigateTo({
            url: '../About/index',
        })
    },
    tohow(){
        wx.navigateTo({
          url: '../How/index',
        })
    },
    tojizhang() {
        wx.showActionSheet({
            itemList: ['zc', 'qk'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex) //点击选择按钮，打印
                }
                if (res.tapIndex == 0) {
                    wx.navigateTo({
                        url: '../Jizhang/index?user=zc',
                    })
                } else if (res.tapIndex == 1) {
                    wx.navigateTo({
                        url: '../Jizhang/index?user=qk',
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    datediff(end) {
        let today = util.formatTime(new Date(), 3);
        let days;
        end = new Date(end);
        today = new Date(today)
        if (end > today) {
            days = parseInt(Math.abs(end - today) / 1000 / 60 / 60 / 24);
        } else {
            days = parseInt(Math.abs(end - today) / 1000 / 60 / 60 / 24); // 如果不限制对比时间和当前时间大小可以不用if
        }
        return days;
    },
    timer() {
        let day = this.datediff('2022-02-14')
        let date = new Date();
        this.setData({
            day: day,
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        })
    },
    onLoad: function (options) {
        //console.log(this.data.creditA)
        var that = this
        wx.cloud.callFunction({
            name:'getOpenId',
        }).then(res=>{
            console.log(res.result)
           if(res.result!=app.globalData._openidA&&res.result!=app.globalData._openidB){
           //if(false){
               //console.log('fail')
               wx.reLaunch({
                 url: '../Fail/index?id='+res.result,
               })
           }
           else{
               if(res.result==app.globalData._openidA) app.globalData.nowuser='qk'
               else app.globalData.nowuser='zc'
               let last = util.formatTime(new Date(),4);
               wx.cloud.callFunction({
                   name:'update',
                   data:{
                       choice:11,
                       setname:'UserList',
                       openid:res.result,
                       last:last
                   }
               })
           }
           setInterval(function () {
            that.timer()
        }, 100);
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