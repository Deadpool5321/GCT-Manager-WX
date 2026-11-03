const api = require('./api.js');

// 微信快捷登录
exports.wechatLogin = async (code) => {
  const res = await api.wechatLogin(code);
  // 存储用户信息和token
  wx.setStorageSync('userInfo', res.userInfo);
  wx.setStorageSync('token', res.token);
  wx.setStorageSync('userType', res.userInfo.userType);
  return res.userInfo;
};

// 账号密码登录
exports.accountLogin = async (username, password, userType) => {
  // 测试账号，方便调试
  if ((username === 'admin' && password === '123' && userType === 'admin') || 
      (username === 'student' && password === '123' && userType === 'student')) {
    // 使用传入的userType确保与api.js一致
    const actualUserType = userType;
    // 模拟登录成功返回的用户信息
    const mockUserInfo = {
      id: username === 'admin' ? 'admin123' : 'student123',
      username: username,
      name: username === 'admin' ? '管理员' : '学生',
      userType: actualUserType,
      avatar: '/images/avatar-default.png'
    };
    // 存储模拟的用户信息和token
    wx.setStorageSync('userInfo', mockUserInfo);
    wx.setStorageSync('token', 'mock-token-' + username);
    wx.setStorageSync('userType', actualUserType);
    return mockUserInfo;
  }
  
  // 正常登录逻辑
  const res = await api.accountLogin(username, password, userType);
  wx.setStorageSync('userInfo', res.userInfo);
  wx.setStorageSync('token', res.token);
  wx.setStorageSync('userType', userType);
  return res.userInfo;
};

// 退出登录
exports.logout = async () => {
  await api.logout();
  wx.removeStorageSync('userInfo');
  wx.removeStorageSync('token');
  wx.removeStorageSync('userType');
};

// 检查登录状态
exports.checkLogin = () => {
  const token = wx.getStorageSync('token');
  return !!token;
};

// 获取当前用户类型
exports.getUserType = () => {
  return wx.getStorageSync('userType');
};