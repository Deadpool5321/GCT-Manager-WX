const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    currentDate: '', // 当前日期（选择起始日）
    selectedDate: '', // 选中的任务日期
    taskTypes: ['普通', '紧急', '重要', '特殊'], // 任务类型选项
    selectedType: '普通', // 默认任务类型
    formData: {
      taskName: '',
      assignType: 'leastTimes', // 默认分配方式：次数最少
      noticeTypes: ['appPush'] // 默认通知类型：系统APP推送
    }
  },

  onLoad() {
    // 初始化日期选择器
    const today = util.formatDate(new Date(), 'yyyy-MM-dd');
    this.setData({
      currentDate: today,
      selectedDate: today
    });
  },

  // 输入处理
  handleInput(e) {
    const name = e.currentTarget.dataset.name || e.currentTarget.name;
    const value = e.detail.value;
    const formData = this.data.formData;
    formData[name] = value;
    this.setData({ formData });
  },

  // 日期选择变化
  onDateChange(e) {
    this.setData({ selectedDate: e.detail.value });
  },

  // 任务类型选择变化
  onTypeChange(e) {
    this.setData({ selectedType: this.data.taskTypes[e.detail.value] });
  },

  // 分配方式选择变化
  onAssignTypeChange(e) {
    const formData = this.data.formData;
    formData.assignType = e.detail.value;
    this.setData({ formData });
  },

  // 通知设置变化
  onNoticeChange(e) {
    const { type } = e.currentTarget.dataset;
    const checked = e.detail.value;
    const formData = this.data.formData;
    
    if (checked) {
      // 添加通知类型
      if (!formData.noticeTypes.includes(type)) {
        formData.noticeTypes.push(type);
      }
    } else {
      // 移除通知类型
      formData.noticeTypes = formData.noticeTypes.filter(item => item !== type);
    }
    
    this.setData({ formData });
  },

  // 提交发布任务
  submitTask(e) {
    const { taskName, assignType, noticeTypes } = this.data.formData;
    const taskDate = this.data.selectedDate;
    const taskType = this.data.selectedType;

    // 表单校验
    if (!taskName) {
      wx.showToast({ title: '请输入任务名称', icon: 'none' });
      return;
    }

    const taskData = {
      name: taskName,
      type: taskType,
      date: taskDate,
      assignType: assignType,
      noticeTypes: noticeTypes || []
    };

    // 模拟分配算法
    this.assignTask(taskData);

    wx.showLoading({ title: '发布中...' });
    
    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '发布成功' });
      // 返回管理员面板并刷新数据
      wx.navigateBack({ delta: 1 });
    }, 1500);
  },

  // 任务分配算法
  assignTask(taskData) {
    const { assignType } = taskData;
    
    // 模拟学生数据
    const students = [
      { id: 'stu1', name: '张三', completedTasks: 3 },
      { id: 'stu2', name: '李四', completedTasks: 5 },
      { id: 'stu3', name: '王五', completedTasks: 2 },
      { id: 'stu4', name: '赵六', completedTasks: 7 },
      { id: 'stu5', name: '钱七', completedTasks: 1 }
    ];
    
    let assignedStudent;
    
    switch (assignType) {
      case 'leastTimes':
        // 次数最少算法：按已完成任务数量排序，选择最少的
        assignedStudent = students.sort((a, b) => a.completedTasks - b.completedTasks)[0];
        break;
        
      case 'random':
        // 随机分配算法：随机选择一个学生
        assignedStudent = students[Math.floor(Math.random() * students.length)];
        break;
        
      case 'designated':
        // 指定人员：这里可以根据实际需求实现，比如从指定列表中选择
        assignedStudent = students[0]; // 示例：默认选择第一个
        break;
        
      case 'apply':
        // 主动申请：这里可以实现为待申请状态，不立即分配
        console.log('任务已发布，等待学生主动申请');
        return;
        
      default:
        assignedStudent = students[0];
    }
    
    if (assignedStudent) {
      console.log(`任务已分配给：${assignedStudent.name} (已完成任务数：${assignedStudent.completedTasks})`);
    }
  }
});