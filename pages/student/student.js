const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    ongoingTask: null, // 进行中任务
    expireTasks: [] // 即将到期任务
  },

  onShow() {
    this.loadStudentTasks();
  },

  // 加载学员任务数据
  loadStudentTasks() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用，使用模拟数据
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟进行中任务
      const ongoingTask = {
        id: 'task001',
        name: '图书馆整理',
        time: '2025-12-25 09:00-12:00',
        location: '图书馆二楼',
        reward: 50,
        status: 'ongoing'
      };
      
      // 模拟即将到期任务
      const expireTasks = [
        {
          id: 'task002',
          name: '实验室清洁',
          time: '2025-12-26 14:00-17:00',
          location: '实验楼A座301',
          reward: 40
        },
        {
          id: 'task003',
          name: '校园巡逻',
          time: '2025-12-27 19:00-22:00',
          location: '校园各区域',
          reward: 70
        }
      ];
      
      this.setData({
        ongoingTask: ongoingTask,
        expireTasks: expireTasks
      });
    }, 1000);
  },

  // 接受任务
  acceptTask() {
    wx.showLoading({ title: '处理中...' });
    
    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '已接受任务' });
      this.loadStudentTasks(); // 刷新任务列表
    }, 1000);
  },

  // 拒绝任务
  rejectTask() {
    wx.showModal({
      title: '提示',
      content: '确定要申请拒绝该任务吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中...' });
          
          // 模拟API调用
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({ title: '已提交拒绝申请' });
            this.loadStudentTasks();
          }, 1000);
        }
      }
    });
  },
  
  // 查看任务详情
  viewTaskDetail() {
    wx.navigateTo({
      url: '/pages/task-list/task-list'
    });
  },
  
  // 前往任务列表
  goToTaskList() {
    wx.switchTab({
      url: '/pages/task-list/task-list'
    });
  }
});