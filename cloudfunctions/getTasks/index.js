// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { status, userType, userId, page = 1, limit = 20 } = event
  
  try {
    let query = db.collection('tasks')
    
    // 根据状态筛选
    if (status) {
      query = query.where({ status })
    }
    
    // 如果是学生，只获取分配给该学生的任务
    if (userType === 'student' && userId) {
      query = query.where({
        assignedTo: userId
      })
    }
    
    // 计算偏移量
    const offset = (page - 1) * limit
    
    // 查询任务列表
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip(offset)
      .limit(limit)
      .get()
    
    // 获取总数
    const countResult = await db.collection('tasks').count()
    
    return {
      success: true,
      tasks: result.data,
      total: countResult.total,
      page,
      limit
    }
  } catch (error) {
    console.error('获取任务列表失败:', error)
    return {
      success: false,
      msg: '获取任务列表失败'
    }
  }
}
