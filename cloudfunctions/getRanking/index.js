// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { type = 'weekly', limit = 10 } = event
  
  try {
    // 计算时间范围
    const now = new Date()
    let startTime = new Date()
    
    if (type === 'weekly') {
      // 最近7天
      startTime.setDate(now.getDate() - 7)
    } else if (type === 'monthly') {
      // 最近30天
      startTime.setDate(now.getDate() - 30)
    } else if (type === 'yearly') {
      // 最近365天
      startTime.setDate(now.getDate() - 365)
    }
    
    // 查询完成的任务
    const completedTasks = await db.collection('tasks')
      .where({
        status: 'completed',
        completedAt: {
          $gte: startTime,
          $lte: now
        }
      })
      .get()
    
    // 统计每个用户的完成任务数
    const userTaskCount = {}
    completedTasks.data.forEach(task => {
      const userId = task.assignedTo
      if (userId) {
        userTaskCount[userId] = (userTaskCount[userId] || 0) + 1
      }
    })
    
    // 转换为数组并排序
    const rankingArray = Object.entries(userTaskCount)
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
    
    // 获取用户信息
    const rankingWithUserInfo = []
    for (const item of rankingArray) {
      try {
        const userResult = await db.collection('users')
          .doc(item.userId)
          .get()
        
        if (userResult.data) {
          rankingWithUserInfo.push({
            ...item,
            userInfo: {
              _id: userResult.data._id,
              username: userResult.data.username,
              name: userResult.data.name || userResult.data.username,
              avatar: userResult.data.avatar || ''
            }
          })
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
    
    return {
      success: true,
      ranking: rankingWithUserInfo,
      type,
      limit
    }
  } catch (error) {
    console.error('获取排行榜失败:', error)
    return {
      success: false,
      msg: '获取排行榜失败'
    }
  }
}
