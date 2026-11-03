// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    taskName,
    taskType,
    assignedTo,
    deadline,
    description,
    publisherId
  } = event
  
  try {
    // 验证必要参数
    if (!taskName || !taskType || !assignedTo || !deadline) {
      return {
        success: false,
        msg: '请填写完整的任务信息'
      }
    }
    
    // 获取发布者信息
    const publisherResult = await db.collection('users')
      .doc(publisherId)
      .get()
    
    if (!publisherResult.data) {
      return {
        success: false,
        msg: '发布者信息不存在'
      }
    }
    
    // 发布任务
    const result = await db.collection('tasks').add({
      data: {
        taskName,
        taskType,
        assignedTo,
        deadline: new Date(deadline),
        description,
        status: 'pending', // 初始状态：待处理
        publisher: publisherId,
        publisherName: publisherResult.data.name || publisherResult.data.username,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
    // 获取完整的任务信息
    const taskResult = await db.collection('tasks')
      .doc(result._id)
      .get()
    
    return {
      success: true,
      task: taskResult.data
    }
  } catch (error) {
    console.error('发布任务失败:', error)
    return {
      success: false,
      msg: '发布任务失败，请重试'
    }
  }
}
