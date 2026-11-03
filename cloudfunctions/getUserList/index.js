// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { userType, page = 1, limit = 20 } = event
  
  try {
    let query = db.collection('users')
    
    // 根据用户类型筛选
    if (userType) {
      query = query.where({ userType })
    }
    
    // 计算偏移量
    const offset = (page - 1) * limit
    
    // 查询用户列表
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip(offset)
      .limit(limit)
      .get()
    
    // 获取总数
    const countResult = await db.collection('users').count()
    
    return {
      success: true,
      users: result.data,
      total: countResult.total,
      page,
      limit
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return {
      success: false,
      msg: '获取用户列表失败'
    }
  }
}
