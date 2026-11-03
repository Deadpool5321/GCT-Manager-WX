// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      name: '',
      studentId: '',
      username: '',
      password: '',
      confirmPassword: '',
      userType: 'student'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 处理radio选择事件
   */
  handleRadioChange: function(e) {
    const value = e.detail.value;
    const formData = this.data.formData;
    formData.userType = value;
    this.setData({ formData });
  },

  /**
   * 表单提交
   */
  submitRegister: function(e) {
    const formData = e.detail.value;
    console.log('表单数据:', formData);
    
    // 表单验证
    if (!this.validateForm(formData)) {
      return;
    }
    
    // 提交注册请求
    wx.showLoading({ title: '注册中...' });
    
    // 模拟注册成功
    setTimeout(() => {
      wx.hideLoading();
      
      // 注册成功提示
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      });
      
      // 跳转到登录页面
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }, 2000);
    }, 1500);
  },

  /**
   * 表单验证
   */
  validateForm: function(formData) {
    // 姓名验证
    if (!formData.name.trim()) {
      wx.showToast({ title: '请输入姓名', icon: 'none' });
      return false;
    }
    

    
    // 账号验证
    if (!formData.username.trim()) {
      wx.showToast({ title: '请输入账号', icon: 'none' });
      return false;
    }
    
    // 密码验证
    if (!formData.password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return false;
    }
    
    // 密码长度验证
    if (formData.password.length < 6) {
      wx.showToast({ title: '密码长度不能少于6位', icon: 'none' });
      return false;
    }
    
    // 确认密码验证
    if (formData.password !== formData.confirmPassword) {
      wx.showToast({ title: '两次输入的密码不一致', icon: 'none' });
      return false;
    }
    
    return true;
  }
})