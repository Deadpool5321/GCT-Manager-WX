const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    rankingList: [], // 排行榜列表（前N名）
    myRanking: null // 本人排名信息
  },

  onShow() {
    this.loadRankingData();
  },

  // 加载排行榜数据
  loadRankingData() {
    wx.showLoading({ title: '加载中...' });

    // 模拟API调用，使用模拟数据
    setTimeout(() => {
      wx.hideLoading();

      // 模拟排行榜数据（根据图片更新）
      const rankingList = [
        {
          id: 'user001',
          avatar: '/images/avatar-default.svg',
          nickname: '张伟',
          group: '计算机学院',
          count: 45,
          rate: '90%',
          trend: '持平',
          rank: 1
        },
        {
          id: 'user002',
          avatar: '/images/avatar-default.svg',
          nickname: '王强',
          group: '机械工程学院',
          count: 38,
          rate: '85%',
          trend: '持平',
          rank: 2
        },
        {
          id: 'user003',
          avatar: '/images/avatar-default.svg',
          nickname: '王小强',
          group: '电子信息学院',
          count: 35,
          rate: '80%',
          trend: '持平',
          rank: 3
        },
        {
          id: 'user004',
          avatar: '/images/avatar-default.svg',
          nickname: '李逍遥',
          group: '大三/A组',
          count: 32,
          rate: '98%',
          trend: '持平',
          rank: 4
        },
        {
          id: 'user005',
          avatar: '/images/avatar-default.svg',
          nickname: '张明浩',
          group: '大一/C组',
          count: 19,
          rate: '60%',
          trend: '下降',
          rank: 13
        }
      ];

      // 模拟本人排名数据（根据图片更新）
      const myRanking = {
        id: 'currentUser',
        avatar: '/images/avatar-default.svg',
        nickname: '李华',
        group: '大一/A组',
        count: 22,
        rate: '75%',
        trend: '持平',
        rank: 12
      };

      this.setData({
        rankingList: rankingList,
        myRanking: myRanking
      });
    }, 1000);
  }
});