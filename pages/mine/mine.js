// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    // 设置到页面数据中
    this.setData({
      userInfo: userInfo,
      totalTasks: Math.floor(Math.random() * 20) + 1,
      completedTasks: Math.floor(Math.random() * userInfo.totalTasks || 10) + 1,
      pendingTasks: Math.floor(Math.random() * 10) + 1
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 退出登录
   */
  logout: function() {
    // 清除本地存储的用户信息和token
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    wx.removeStorageSync('userType');
    // 跳转到登录页面
    wx.redirectTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 跳转到设置页面
   */
  goToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  /**
   * 跳转到关于我们页面
   */
  goToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  }
})