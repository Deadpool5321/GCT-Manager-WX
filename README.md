# 公差通 (GCT-Manager-WX)

> 基于**微信原生小程序 + 微信云开发**的校园公差任务管理系统，覆盖任务发布、智能派单、领取执行、完成统计、排行激励的全流程闭环。

![WeChat MiniProgram](https://img.shields.io/badge/微信-小程序-07c160)
![CloudBase](https://img.shields.io/badge/微信云开发-Serverless-blue)
![Node.js](https://img.shields.io/badge/Node.js-wx--server--sdk-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 项目简介

「公差通」解决校园公差管理中**人工派单繁琐、任务分配不均、完成情况难统计**的痛点：

- 管理员一键发布公差，系统按「**次数最少优先**」策略智能分配；
- 学生在公差大厅浏览、领取任务，首页聚合进行中与即将到期的任务；
- 按周 / 月 / 年聚合完成任务量生成排行榜，以积分激励提升参与度；
- 管理端看板集成 Canvas 图表，可视化任务饱和度趋势。

## 功能特性

### 角色与权限

| 角色 | 能力 |
| --- | --- |
| 管理员 | 数据看板、发布任务、智能派单、人员管理（列表 / 筛选 / 添加用户） |
| 学生 | 任务首页、公差大厅领取任务、接受 / 拒绝申请、查看排行、个人中心 |

### 核心模块

- **登录注册**：账号密码登录（云函数校验，Token 本地持久化）、按姓名 / 学号注册、双角色分流进入不同首页
- **任务发布**：任务名称、类型（普通 / 紧急 / 重要 / 特殊）、执行日期、分配方式（次数最少优先）、通知方式（APP 推送）
- **公差大厅**：任务卡片列表，按状态筛选（待领取 / 已完成），一键领取
- **学生首页**：进行中任务、即将到期任务聚合展示，支持接受 / 发起拒绝申请
- **排行榜**：周榜（7 天）/ 月榜（30 天）/ 年榜（365 天）Top 10 + 本人排名，云函数聚合统计
- **人员管理**：用户列表分页加载、按角色类型筛选、批量添加用户
- **管理看板**：待处理 / 已完成数量统计、任务饱和度趋势折线图、近期紧急任务速览

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 前端 | 微信原生小程序（WXML / WXSS / JavaScript），4 Tab 页面架构，共 12 个页面 |
| 图表 | wx-charts（Canvas 绘制趋势图） |
| 后端 | 微信云开发（云函数 Node.js + wx-server-sdk，Serverless，免运维） |
| 数据库 | 云数据库 NoSQL（users / tasks / notifications 三个集合） |

## 云函数一览

| 云函数 | 职责 |
| --- | --- |
| `login` | 账号密码校验，签发 Token 并返回用户信息 |
| `publishTask` | 参数校验 → 发布者鉴权 → 写入任务集合（初始状态 pending） |
| `getTasks` | 任务列表查询：按状态筛选、学生端按 `assignedTo` 数据隔离、skip/limit 分页 |
| `getRanking` | 按周 / 月 / 年时间窗聚合 completed 任务，统计各用户完成量并排序取 Top N |
| `getUserList` | 用户列表查询：按 userType 筛选、分页 |
| `initDB` | 一键初始化数据库：创建集合并写入测试账号与测试任务 |

## 项目结构

```
GCT-Manager-WX
├── pages/                  # 页面（12 个）
│   ├── login/              # 登录
│   ├── register/           # 注册
│   ├── admin/              # 管理员首页（数据看板 + 趋势图）
│   ├── admin-publish/      # 发布任务
│   ├── admin-user/         # 人员管理（含 add-user 添加用户子页面）
│   ├── student/            # 学生首页（进行中 / 即将到期任务）
│   ├── task-list/          # 公差大厅（筛选 / 领取）
│   ├── ranking/            # 排行榜
│   ├── mine/               # 我的
│   ├── settings/           # 设置
│   └── about/              # 关于
├── cloudfunctions/         # 云函数（6 个，见上表）
├── components/wx-chart/    # Canvas 图表组件
├── utils/                  # api.js（云函数调用封装）、auth.js（登录态管理）、util.js
├── images/                 # 图标资源（导航 / 功能图标）
├── app.js / app.json       # 小程序入口与全局配置
└── project.config.json     # 项目配置
```

## 数据库设计

| 集合 | 关键字段 |
| --- | --- |
| `users` | username、password、userType（admin / student）、name、avatar、createdAt |
| `tasks` | taskName、taskType、assignedTo、deadline、description、status（pending / completed）、publisher、publisherName、completedAt |
| `notifications` | 通知消息记录（推送预留） |

## 快速开始

### 1. 环境准备

- 注册[微信小程序](https://mp.weixin.qq.com/)账号，获取 AppID
- 安装最新版[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 在开发者工具中开通**云开发**，创建云环境

### 2. 导入项目

```bash
git clone https://github.com/Deadpool5321/GCT-Manager-WX.git
```

用微信开发者工具导入项目根目录，并将 `project.config.json` 中的 `appid` 替换为你自己的 AppID。

### 3. 部署云函数

在开发者工具左侧云函数目录中，对 `cloudfunctions/` 下的每个云函数（login、publishTask、getTasks、getRanking、getUserList、initDB）**右键 → 上传并部署：云端安装依赖**。

### 4. 初始化数据库

云函数部署完成后，在开发者工具云开发控制台手动调用（或小程序端调用）`initDB` 云函数，自动创建三个集合并写入测试数据。

### 5. 测试账号

| 角色 | 账号 | 密码 |
| --- | --- | --- |
| 管理员 | admin | admin123 |
| 学生 | student1 | student123 |
| 学生 | student2 | student123 |

## Roadmap

- [ ] 前端页面与云函数全量联调（部分页面当前使用本地模拟数据，接口层已就绪）
- [ ] 基于微信 openid 的免密登录
- [ ] 订阅消息推送（任务分配 / 即将到期提醒）
- [ ] 任务逾期自动提醒与超时统计

## 作者

- GitHub：[Deadpool5321](https://github.com/Deadpool5321)

## License

[MIT](LICENSE)
