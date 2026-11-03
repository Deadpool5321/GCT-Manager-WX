// pages/admin-user/add-user/add-user.js
const api = require('../../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      userIdentifier: '', // 用户ID或账号
      userType: 'student' // 默认用户类型为学生
    },
    searchResult: null // 搜索结果
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
   * 处理单选按钮选择事件
   */
  handleRadioChange: function(e) {
    const value = e.currentTarget.dataset.value;
    const formData = this.data.formData;
    formData.userType = value;
    this.setData({ formData });
  },

  /**
   * 提交表单，查询用户
   */
  submitAddUser: function(e) {
    const { userIdentifier, userType } = this.data.formData;
    
    if (!userIdentifier.trim()) {
      wx.showToast({ title: '请输入用户ID或账号', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '查询中...' });
    
    // 模拟API调用，根据用户ID或账号查询用户信息
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟查询结果
      const mockUsers = [
        {
          id: '1001',
          username: 'zhangsan',
          name: '张三',
          userType: 'student',
          avatar: '/images/avatar-default.svg'
        },
        {
          id: '1002',
          username: 'lisi',
          name: '李四',
          userType: 'student',
          avatar: '/images/avatar-default.svg'
        },
        {
          id: '1003',
          username: 'wangwu',
          name: '王五',
          userType: 'student',
          avatar: '/images/avatar-default.svg'
        },
        {
          id: '0001',
          username: 'admin1',
          name: '管理员1',
          userType: 'admin',
          avatar: '/images/avatar-default.svg'
        }
      ];
      
      // 查找匹配的用户
      const foundUser = mockUsers.find(user => 
        user.id === userIdentifier || 
        user.username === userIdentifier
      );
      
      if (foundUser) {
        this.setData({ searchResult: foundUser });
        wx.showToast({ title: '找到用户', icon: 'success' });
      } else {
        wx.showToast({ title: '未找到用户，请检查输入', icon: 'none' });
        this.setData({ searchResult: null });
      }
    }, 1000);
  },

  /**
   * 确认添加用户
   */
  confirmAdd: function() {
    const user = this.data.searchResult;
    
    if (!user) {
      wx.showToast({ title: '请先查询用户', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '添加中...' });
    
    // 模拟API调用，添加用户到群组
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ 
        title: `成功添加${user.name}到群组`, 
        icon: 'success' 
      });
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  },

  /**
   * 取消添加
   */
  cancelAdd: function() {
    wx.navigateBack();
  }
});
