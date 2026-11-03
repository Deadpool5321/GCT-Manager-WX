// pages/settings/settings.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    cacheSize: '0KB'
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    // 设置到页面数据中
    this.setData({
      userInfo: userInfo
    });
    
    // 计算缓存大小（模拟）
    this.calculateCacheSize();
  },

  /**
   * 更换头像
   */
  changeAvatar() {
    const that = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
        
        // 模拟上传头像
        wx.showLoading({ title: '上传中...' });
        
        setTimeout(() => {
          wx.hideLoading();
          
          // 模拟上传成功，更新本地存储的用户信息
          const userInfo = that.data.userInfo;
          userInfo.avatar = tempFilePaths[0]; // 使用本地临时路径作为头像
          
          wx.setStorageSync('userInfo', userInfo);
          that.setData({ userInfo: userInfo });
          
          wx.showToast({ title: '头像更换成功', icon: 'success' });
        }, 1000);
      }
    });
  },

  /**
   * 更改名称
   */
  changeName() {
    const that = this;
    
    wx.showModal({
      title: '更改名称',
      placeholderText: '请输入新名称',
      editable: true,
      success: function(res) {
        if (res.confirm && res.content) {
          // 更新本地存储的用户信息
          const userInfo = that.data.userInfo;
          userInfo.name = res.content;
          
          wx.setStorageSync('userInfo', userInfo);
          that.setData({ userInfo: userInfo });
          
          wx.showToast({ title: '名称更改成功', icon: 'success' });
        }
      }
    });
  },

  /**
   * 计算缓存大小（模拟）
   */
  calculateCacheSize() {
    // 模拟缓存大小
    const cacheSize = (Math.random() * 10).toFixed(2) + 'KB';
    this.setData({ cacheSize: cacheSize });
  },

  /**
   * 清除缓存
   */
  clearCache() {
    const that = this;
    
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除缓存吗？',
      success: function(res) {
        if (res.confirm) {
          // 模拟清除缓存
          wx.showLoading({ title: '清除中...' });
          
          setTimeout(() => {
            wx.hideLoading();
            that.setData({ cacheSize: '0KB' });
            wx.showToast({ title: '缓存清除成功', icon: 'success' });
          }, 1000);
        }
      }
    });
  },


});
