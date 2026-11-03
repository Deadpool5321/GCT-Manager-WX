const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    users: [], // 所有用户数据
    filteredUsers: [], // 筛选后的用户数据
    currentFilter: 'all', // 当前筛选条件
    searchKey: '' // 搜索关键词
  },

  onShow() {
    this.loadUsers();
  },

  // 加载用户数据
  loadUsers() {
    wx.showLoading({ title: '加载中...' });

    // 模拟API调用，使用模拟数据
    setTimeout(() => {
      wx.hideLoading();

      // 模拟用户数据
      const users = [
        {
          id: '1001',
          name: '张三',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 15,
          pendingTasks: 3
        },
        {
          id: '1002',
          name: '李四',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 20,
          pendingTasks: 1
        },
        {
          id: '1003',
          name: '王五',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 12,
          pendingTasks: 4
        },
        {
          id: '1004',
          name: '赵六',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 18,
          pendingTasks: 2
        },
        {
          id: '1005',
          name: '钱七',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 10,
          pendingTasks: 5
        },
        {
          id: '1006',
          name: '孙八',
          avatar: '/images/avatar-default.png',
          userType: 'student',
          completedTasks: 22,
          pendingTasks: 0
        },
        {
          id: '0001',
          name: '管理员1',
          avatar: '/images/avatar-default.png',
          userType: 'admin',
          completedTasks: 0,
          pendingTasks: 0
        },
        {
          id: '0002',
          name: '管理员2',
          avatar: '/images/avatar-default.png',
          userType: 'admin',
          completedTasks: 0,
          pendingTasks: 0
        }
      ];

      this.setData({
        users: users,
        filteredUsers: users
      });
    }, 1000);
  },

  // 切换筛选条件
  switchFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ currentFilter: filter });
    this.filterUsers();
  },

  // 搜索用户
  onSearch(e) {
    const searchKey = e.detail.value;
    this.setData({ searchKey: searchKey });
    this.filterUsers();
  },

  // 筛选用户
  filterUsers() {
    const { users, currentFilter, searchKey } = this.data;
    let filtered = users;

    // 按用户类型筛选
    if (currentFilter !== 'all') {
      filtered = filtered.filter(user => user.userType === currentFilter);
    }

    // 按搜索关键词筛选
    if (searchKey.trim()) {
      const key = searchKey.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(key) || 
        user.id.toLowerCase().includes(key)
      );
    }

    this.setData({ filteredUsers: filtered });
  },

  // 添加人员
  addUser() {
    // 跳转到添加人员页面
    wx.navigateTo({ url: '/pages/admin-user/add-user/add-user' });
  },

  // 编辑人员
  editUser(e) {
    const userId = e.currentTarget.dataset.id;
    wx.showToast({ 
      title: `编辑人员 ${userId}`, 
      icon: 'none' 
    });
    // 这里可以跳转到编辑人员页面
    // wx.navigateTo({ url: `/pages/admin-user/edit-user?id=${userId}` });
  },

  // 删除人员
  deleteUser(e) {
    const userId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该人员吗？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以调用API删除人员
          wx.showToast({ 
            title: '删除成功', 
            icon: 'success' 
          });
          // 重新加载用户数据
          this.loadUsers();
        }
      }
    });
  }
});