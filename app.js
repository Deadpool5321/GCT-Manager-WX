App({
  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: 'your-env-id', // 替换为你的云开发环境ID
      traceUser: true
    })
    
    // 初始化登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },
  globalData: {
    userInfo: null,
    role: null // 'admin' | 'student'
  }
})