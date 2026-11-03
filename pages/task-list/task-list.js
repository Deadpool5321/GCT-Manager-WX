// pages/task-list/task-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentFilter: 'all', // 当前筛选条件
    tasks: [] // 任务列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载任务数据
    this.loadTasks();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时重新加载任务数据
    this.loadTasks();
  },

  /**
   * 加载任务数据
   */
  loadTasks() {
    // 模拟任务数据
    const tasks = [
      {
        id: 'task001',
        name: '图书馆整理',
        status: 'available',
        time: '2025-12-25 09:00-12:00',
        location: '图书馆二楼',
        reward: 50,
        description: '帮助整理图书馆书架，按分类摆放书籍'
      },
      {
        id: 'task002',
        name: '实验室清洁',
        status: 'available',
        time: '2025-12-26 14:00-17:00',
        location: '实验楼A座301',
        reward: 40,
        description: '清理实验室设备和台面，保持环境整洁'
      },
      {
        id: 'task003',
        name: '体育馆秩序维护',
        status: 'completed',
        time: '2025-12-24 18:00-21:00',
        location: '体育馆',
        reward: 60,
        description: '协助维护体育馆活动秩序，引导观众入座'
      },
      {
        id: 'task004',
        name: '校园巡逻',
        status: 'available',
        time: '2025-12-27 19:00-22:00',
        location: '校园各区域',
        reward: 70,
        description: '夜间校园巡逻，确保校园安全'
      },
      {
        id: 'task005',
        name: '食堂帮忙',
        status: 'completed',
        time: '2025-12-23 11:00-13:00',
        location: '第一食堂',
        reward: 30,
        description: '食堂高峰期帮忙打饭和清洁餐桌'
      }
    ];

    // 根据当前筛选条件过滤任务
    const filteredTasks = this.filterTasks(tasks, this.data.currentFilter);

    // 设置任务数据
    this.setData({
      tasks: filteredTasks
    });
  },

  /**
   * 过滤任务
   */
  filterTasks(tasks, filter) {
    switch (filter) {
      case 'available':
        return tasks.filter(task => task.status === 'available');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      default:
        return tasks;
    }
  },

  /**
   * 切换筛选条件
   */
  switchFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    // 根据新的筛选条件重新加载任务数据
    this.loadTasks();
  },

  /**
   * 接受任务
   */
  acceptTask(e) {
    const taskId = e.currentTarget.dataset.id;
    
    wx.showLoading({ title: '处理中...' });
    
    // 模拟接受任务的API调用
    setTimeout(() => {
      wx.hideLoading();
      
      // 更新任务状态
      const tasks = this.data.tasks;
      const index = tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        tasks[index].status = 'completed';
        this.setData({
          tasks: tasks
        });
        
        wx.showToast({ title: '任务接受成功', icon: 'success' });
      } else {
        wx.showToast({ title: '任务不存在', icon: 'none' });
      }
    }, 1000);
  }
})