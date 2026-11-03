// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 1. 初始化用户集合
    await initUsersCollection()
    
    // 2. 初始化任务集合
    await initTasksCollection()
    
    // 3. 初始化通知集合
    await initNotificationsCollection()
    
    console.log('数据库初始化完成')
    
    return {
      success: true,
      msg: '数据库初始化完成'
    }
  } catch (error) {
    console.error('数据库初始化失败:', error)
    return {
      success: false,
      msg: '数据库初始化失败',
      error
    }
  }
}

// 初始化用户集合
async function initUsersCollection() {
  try {
    // 检查用户集合是否存在
    const usersCount = await db.collection('users').count()
    
    if (usersCount.total === 0) {
      // 添加测试用户
      const testUsers = [
        {
          username: 'admin',
          password: 'admin123',
          userType: 'admin',
          name: '管理员',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'student1',
          password: 'student123',
          userType: 'student',
          name: '学生1',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'student2',
          password: 'student123',
          userType: 'student',
          name: '学生2',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      // 批量添加用户
      for (const user of testUsers) {
        await db.collection('users').add({ data: user })
      }
      
      console.log('用户集合初始化完成，添加了测试用户')
    } else {
      console.log('用户集合已存在，跳过初始化')
    }
  } catch (error) {
    console.error('初始化用户集合失败:', error)
  }
}

// 初始化任务集合
async function initTasksCollection() {
  try {
    // 检查任务集合是否存在
    const tasksCount = await db.collection('tasks').count()
    
    if (tasksCount.total === 0) {
      // 获取用户ID
      const usersResult = await db.collection('users').get()
      const admin = usersResult.data.find(u => u.userType === 'admin')
      const students = usersResult.data.filter(u => u.userType === 'student')
      
      if (admin && students.length > 0) {
        // 添加测试任务
        const testTasks = [
          {
            taskName: '测试任务1',
            taskType: '常规',
            assignedTo: students[0]._id,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            description: '这是一个测试任务',
            status: 'pending',
            publisher: admin._id,
            publisherName: admin.name,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            taskName: '测试任务2',
            taskType: '紧急',
            assignedTo: students[1]._id,
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            description: '这是一个紧急测试任务',
            status: 'pending',
            publisher: admin._id,
            publisherName: admin.name,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
        
        // 批量添加任务
        for (const task of testTasks) {
          await db.collection('tasks').add({ data: task })
        }
        
        console.log('任务集合初始化完成，添加了测试任务')
      }
    } else {
      console.log('任务集合已存在，跳过初始化')
    }
  } catch (error) {
    console.error('初始化任务集合失败:', error)
  }
}

// 初始化通知集合
async function initNotificationsCollection() {
  try {
    // 检查通知集合是否存在
    const notificationsCount = await db.collection('notifications').count()
    
    if (notificationsCount.total === 0) {
      console.log('通知集合初始化完成')
    } else {
      console.log('通知集合已存在，跳过初始化')
    }
  } catch (error) {
    console.error('初始化通知集合失败:', error)
  }
}
