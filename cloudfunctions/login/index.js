// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { username, password, userType } = event
  
  try {
    // 查询用户
    const result = await db.collection('users')
      .where({
        username,
        password,
        userType
      })
      .get()
    
    if (result.data.length > 0) {
      const user = result.data[0]
      
      // 生成token（实际项目中可以使用更安全的方式）
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      return {
        success: true,
        userInfo: {
          _id: user._id,
          username: user.username,
          userType: user.userType,
          avatar: user.avatar || '',
          name: user.name || ''
        },
        token
      }
    } else {
      return {
        success: false,
        msg: '账号或密码错误'
      }
    }
  } catch (error) {
    console.error('登录失败:', error)
    return {
      success: false,
      msg: '登录失败，请重试'
    }
  }
}
