const app = getApp();
const auth = require('../../utils/auth.js');
const util = require('../../utils/util.js');

Page({
  data: {
    loginDate: '', // 当前日期
    formData: {
      username: '',
      password: ''
    }
  },

  onLoad() {
    // 初始化当前日期
    const currentDate = util.formatDate(new Date()); 
    this.setData({ loginDate: currentDate });
  },

  /**
   * 处理输入框输入事件
   */
  handleInput: function(e) {
    const name = e.currentTarget.dataset.name;
    const value = e.detail.value;
    const formData = this.data.formData;
    formData[name] = value;
    this.setData({ formData });
  },

  // 微信一键快捷登录
  wechatQuickLogin() {
    wx.showLoading({ title: '登录中...' });
    wx.login({
      success: (res) => {
        if (res.code) {
          // 调用微信登录接口
          auth.wechatLogin(res.code).then((userInfo) => {
            wx.hideLoading();
            // 根据用户类型跳转对应面板
            this.redirectToPanel(userInfo.userType);
          }).catch((err) => {
            wx.hideLoading();
            wx.showToast({
              title: err.msg || '登录失败',
              icon: 'none',
              duration: 2000
            });
          });
        } else {
          wx.hideLoading();
          wx.showToast({ title: '登录失败，请重试', icon: 'none' });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      }
    });
  },

  // 账号密码登录
  formLogin(e) {
    const { username, password } = e.detail.value;
    if (!username || !password) {
      wx.showToast({ title: '账号密码不能为空', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '登录中...' });
    // 调用账号登录接口，根据用户名自动判断用户类型
    const userType = username === 'admin' ? 'admin' : 'student';
    auth.accountLogin(username, password, userType).then((userInfo) => {
      wx.hideLoading();
      this.redirectToPanel(userInfo.userType);
    }).catch((err) => {
      wx.hideLoading();
      wx.showToast({
        title: err.msg || '账号密码错误',
        icon: 'none',
        duration: 2000
      });
    });
  },

  // 根据用户类型跳转面板
  redirectToPanel(userType) {
    // 所有用户登录后都跳转到首页
    wx.switchTab({ url: '/pages/admin/admin' });
  }
});