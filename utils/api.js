// ===========================================
// API接口定义（云开发版）
// ===========================================

// 通用云函数调用
const callCloudFunction = (name, data = {}) => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success: (res) => {
        if (res.result) {
          resolve(res.result);
        } else {
          reject({ msg: '云函数调用失败' });
        }
      },
      fail: (err) => {
        reject({ msg: '云函数调用异常', err });
      }
    });
  });
};

// 登录相关接口
exports.wechatLogin = (code) => {
  // 调用云函数：login（后续可扩展支持微信登录）
  return callCloudFunction('login', { code });
};

exports.accountLogin = (username, password, userType) => {
  // 调用云函数：login
  return callCloudFunction('login', { username, password, userType });
};

// 退出登录
exports.logout = () => {
  // 本地清除登录状态
  wx.removeStorageSync('userInfo');
  wx.removeStorageSync('token');
  return Promise.resolve({ success: true });
};

// 管理员相关接口
exports.getTaskOverview = () => {
  // 调用云函数：getTasks（简化版，获取任务概览）
  return callCloudFunction('getTasks', {});
};

exports.getTaskTrend = () => {
  // 调用云函数：getTasks（简化版，获取任务趋势）
  return callCloudFunction('getTasks', {});
};

exports.publishTask = (taskData) => {
  // 调用云函数：publishTask
  return callCloudFunction('publishTask', taskData);
};

exports.getUserList = () => {
  // 调用云函数：getUserList
  return callCloudFunction('getUserList', {});
};

// 任务相关接口
exports.getTaskList = (status) => {
  // 调用云函数：getTasks
  const userInfo = wx.getStorageSync('userInfo');
  return callCloudFunction('getTasks', {
    status,
    userType: userInfo?.userType,
    userId: userInfo?._id
  });
};

exports.acceptTask = (taskId) => {
  // 预留云函数：acceptTask（后续实现）
  return Promise.resolve({ success: true });
};

exports.rejectTask = (taskId) => {
  // 预留云函数：rejectTask（后续实现）
  return Promise.resolve({ success: true });
};

// 排行相关接口
exports.getRankingList = () => {
  // 调用云函数：getRanking
  return callCloudFunction('getRanking', {});
};

// 用户相关接口
exports.getUserInfo = () => {
  // 从本地存储获取用户信息
  const userInfo = wx.getStorageSync('userInfo');
  return Promise.resolve({ success: true, userInfo });
};

exports.updateUserInfo = (userInfo) => {
  // 预留云函数：updateUserInfo（后续实现）
  return Promise.resolve({ success: true });
};