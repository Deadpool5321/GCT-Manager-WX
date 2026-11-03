const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    pendingCount: 0, // 待处理任务数
    completedCount: 0, // 本周完成任务数
    trendData: [], // 任务饱和度趋势数据
    recentTask: null, // 近期紧急任务
    userType: '' // 用户类型
  },

  onShow() {
    // 获取用户类型
    const userType = wx.getStorageSync('userType');
    this.setData({ userType });
    this.loadAdminData();
  },

  // 加载管理员面板数据
  loadAdminData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用，使用模拟数据
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟任务概览数据
      const overview = {
        pendingCount: 5, // 待处理任务数
        completedCount: 12 // 本周完成任务数
      };
      
      // 模拟趋势图数据
      const trend = [
        { date: '12-20', value: 80 },
        { date: '12-21', value: 75 },
        { date: '12-22', value: 90 },
        { date: '12-23', value: 85 },
        { date: '12-24', value: 78 },
        { date: '12-25', value: 92 },
        { date: '12-26', value: 88 }
      ];
      
      // 模拟近期紧急任务
      const recentTask = {
        id: 'task001',
        name: '图书馆整理',
        publishTime: '2025-12-24 14:30',
        progress: '75%' // 当前进度
      };
      
      // 重新获取用户类型，确保不会丢失
      const userType = wx.getStorageSync('userType');
      
      this.setData({
        pendingCount: overview.pendingCount,
        completedCount: overview.completedCount,
        trendData: trend,
        recentTask: recentTask,
        userType: userType // 重新设置用户类型
      });
    }, 1000);
  },

  // 前往发布任务页面
  goToPublish() {
    wx.navigateTo({ url: '/pages/admin-publish/publish' });
  },

  // 查看任务详情
  viewTaskDetail() {
    wx.showToast({ title: '查看任务详情', icon: 'none' });
    // 这里可以根据任务ID跳转到任务详情页面
    // const taskId = this.data.recentTask.id;
    // wx.navigateTo({ url: `/pages/task-detail/detail?taskId=${taskId}` });
  },

  // 前往人员管理
  goToUserManage() {
    wx.navigateTo({ url: '/pages/admin-user/admin-user' });
  },

  // 前往任务统计
  goToTaskStat() {
    wx.showToast({ title: '前往任务统计', icon: 'none' });
    // wx.navigateTo({ url: '/pages/admin-stat/stat' });
  },

  // 前往设置页面
  goToSetting() {
    wx.showToast({ title: '前往设置页面', icon: 'none' });
    // wx.navigateTo({ url: '/pages/admin-setting/setting' });
  }
});