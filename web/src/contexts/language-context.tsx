'use client'

import React, { createContext, useContext, useState } from 'react'

export type Language = 'en' | 'zh'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

interface TranslationDictionary {
  [language: string]: {
    [key: string]: string
  }
}

const translations: TranslationDictionary = {
  en: {
    // Common
    'common.startNow': 'Start Now',
    'common.getStarted': 'Get Started',
    'common.viewGithub': 'View on GitHub',
    'common.learnMore': 'Learn More',
    'common.contact': 'Contact Us',
    'common.trial': 'Free Trial',
    'common.appName': 'RT-FADS',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.model': 'Model Monitor',
    'nav.system': 'System Monitor',
    'nav.rules': 'Rules Config',
    'nav.alerts': 'Alert Management',
    'nav.reports': 'Reports',
    'nav.user': 'User Management',
    'nav.settings': 'Settings',
    'nav.toggleSidebar': 'Toggle Sidebar',
    'theme.toggle': 'Toggle Theme',

    // Theme
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',

    // Landing Page
    'landing.nav.features': 'Features',
    'landing.nav.architecture': 'Architecture',
    'landing.nav.docs': 'Documentation',
    'landing.nav.dashboard': 'Dashboard',

    'landing.hero.title1': 'Real-Time Fraud',
    'landing.hero.highlight': 'Detection',
    'landing.hero.title2': 'System',
    'landing.hero.subtitle': 'Advanced AI-powered fraud detection with privacy-preserving technology',

    'landing.stats.transactions': 'Transactions Processed',
    'landing.stats.accuracy': 'Detection Accuracy',
    'landing.stats.response': 'Response Time',
    'landing.stats.saved': 'Loss Prevention',

    'landing.tech.title': 'Technology Stack',
    'landing.tech.subtitle': 'Built with cutting-edge technologies',

    'landing.cta.title': 'Ready to Get Started?',
    'landing.cta.subtitle': 'Join thousands of businesses protecting their transactions',
    'landing.cta.trial': 'Start Free Trial',
    'landing.cta.contact': 'Contact Sales',

    'landing.footer.description': 'Advanced real-time fraud detection system powered by MT-HGNN and privacy-preserving technology',

    // Architecture
    'arch.title': 'System Architecture',
    'arch.subtitle': 'Modern, scalable and secure architecture design',
    'arch.frontend': 'Frontend Layer',
    'arch.backend': 'Backend Services',
    'arch.model': 'Model Layer',
    'arch.data': 'Data Layer',
    'arch.infra': 'Infrastructure',

    // Model Encryption
    'model.encryption.title': 'Privacy-Preserving Model Training',
    'model.encryption.subtitle': 'Secure and private model training process with homomorphic encryption',
    'model.encryption.step1': 'Send encrypted training data',
    'model.encryption.step2': 'Process encrypted features',
    'model.encryption.step3': 'Secure model computation',
    'model.encryption.step4': 'Return encrypted gradients',
    'model.encryption.step5': 'Apply privacy protection',
    'model.encryption.step6': 'Add noise to results',
    'model.encryption.step7': 'Update encrypted model',
    'model.encryption.step8': 'Return secure predictions',
    'model.encryption.note1': 'Secure Model Training Process',
    'model.encryption.note2': 'Privacy-Preserving Training Complete',

    // Dashboard
    'dashboard.title': 'System Overview',
    'dashboard.metrics': 'Key Metrics',
    'dashboard.performance': 'System Performance',
    'dashboard.successRate': 'Success Rate',
    'dashboard.avgLatency': 'Avg Latency',
    'dashboard.processed': 'Processed',
    'dashboard.fraudDetected': 'Fraud Detected',
    'dashboard.trainingHistory': 'Training History',
    'dashboard.predictionDist': 'Prediction Distribution',

    // Reports Page
    'reports.title': 'Analytics Reports',

    // Alert Management Page
    'alerts.management.title': 'Alert Management',
    'alerts.management.overview': 'Alert Overview',
    'alerts.management.dashboard': 'Alert Dashboard',
    
    'alerts.status.active': 'Active Alerts',
    'alerts.status.pending': 'Pending Review',
    'alerts.status.resolved': 'Resolved Alerts',
    'alerts.status.ignored': 'Ignored Alerts',
    
    'alerts.priority.critical': 'Critical',
    'alerts.priority.high': 'High',
    'alerts.priority.medium': 'Medium',
    'alerts.priority.low': 'Low',
    
    'alerts.type.fraud': 'Fraud Alert',
    'alerts.type.system': 'System Alert',
    'alerts.type.model': 'Model Alert',
    'alerts.type.rule': 'Rule Alert',
    'alerts.type.security': 'Security Alert',
    
    'alerts.details.id': 'Alert ID',
    'alerts.details.time': 'Alert Time',
    'alerts.details.source': 'Alert Source',
    'alerts.details.type': 'Alert Type',
    'alerts.details.priority': 'Priority',
    'alerts.details.status': 'Status',
    'alerts.details.description': 'Description',
    'alerts.details.assignee': 'Assignee',
    
    'alerts.actions.acknowledge': 'Acknowledge',
    'alerts.actions.resolve': 'Resolve',
    'alerts.actions.ignore': 'Ignore',
    'alerts.actions.escalate': 'Escalate',
    'alerts.actions.assign': 'Assign',
    'alerts.actions.comment': 'Comment',
    
    'alerts.filters.timeRange': 'Time Range',
    'alerts.filters.priority': 'Priority',
    'alerts.filters.status': 'Status',
    'alerts.filters.type': 'Alert Type',
    'alerts.filters.assignee': 'Assignee',
    
    'alerts.stats.total': 'Total Alerts',
    'alerts.stats.critical': 'Critical Alerts',
    'alerts.stats.resolved': 'Resolved Today',
    'alerts.stats.pending': 'Pending Review',

    // User Management Page
    'user.management.title': 'User Management',
    'user.management.overview': 'User Overview',
    'user.management.roles': 'Role Management',
    
    'user.list.active': 'Active Users',
    'user.list.inactive': 'Inactive Users',
    'user.list.locked': 'Locked Users',
    'user.list.pending': 'Pending Approval',
    
    'user.roles.admin': 'Administrator',
    'user.roles.manager': 'Manager',
    'user.roles.analyst': 'Analyst',
    'user.roles.operator': 'Operator',
    'user.roles.viewer': 'Viewer',
    
    'user.details.username': 'Username',
    'user.details.email': 'Email',
    'user.details.role': 'Role',
    'user.details.department': 'Department',
    'user.details.status': 'Status',
    'user.details.lastLogin': 'Last Login',
    'user.details.created': 'Created Date',
    'user.details.modified': 'Last Modified',
    
    'user.actions.create': 'Create User',
    'user.actions.edit': 'Edit User',
    'user.actions.delete': 'Delete User',
    'user.actions.activate': 'Activate User',
    'user.actions.deactivate': 'Deactivate User',
    'user.actions.resetPassword': 'Reset Password',
    'user.actions.assignRole': 'Assign Role',
    
    'user.permissions.view': 'View Permission',
    'user.permissions.edit': 'Edit Permission',
    'user.permissions.delete': 'Delete Permission',
    'user.permissions.manage': 'Manage Permission',
    'user.permissions.admin': 'Admin Permission',

    // Settings Page
    'settings.title': 'System Settings',
    'settings.general': 'General Settings',
    'settings.security': 'Security Settings',
    'settings.notification': 'Notification Settings',
    'settings.integration': 'Integration Settings',
    'settings.backup': 'Backup & Recovery',
    
    // API Test Page
    'settings.integration.api.test': 'API Testing',
    'settings.integration.api.testAll': 'Test All Endpoints',
    'settings.integration.api.endpoints': 'API Endpoints',
    'settings.integration.api.results': 'Test Results',
    'settings.integration.api.success': 'Success',
    'settings.integration.api.error': 'Error',
    'settings.integration.api.responseTime': 'Response Time',
    'settings.integration.api.lastTested': 'Last Tested',

    // API Endpoints
    'api.endpoints.fraudDetection': 'Fraud Detection API',
    'api.endpoints.modelTraining': 'Model Training API',
    'api.endpoints.userManagement': 'User Management API',
    'api.endpoints.alerts': 'Alerts API',
    'api.endpoints.reports': 'Reports API',

    // System Monitor
    'system.monitor.title': 'System Monitor',
    'system.monitor.overview': 'System Overview',
    'system.monitor.performance': 'Performance Metrics',
    'system.monitor.health': 'System Health',
    'system.monitor.resources': 'Resource Usage',

    // Model Monitor
    'model.monitor.title': 'Model Monitor',
    'model.monitor.performance': 'Model Performance',
    'model.monitor.training': 'Training Status',
    'model.monitor.predictions': 'Prediction Analysis',
    'model.monitor.drift': 'Model Drift',

    // Reports
    'reports.analytics.title': 'Reports & Analytics',
    'reports.analytics.overview': 'Overview',
    'reports.analytics.metrics': 'Key Metrics',
    'reports.analytics.trends': 'Trends Analysis',
    'reports.analytics.details': 'Detailed Reports',
  },
  zh: {
    // 通用
    'common.startNow': '立即开始',
    'common.getStarted': '开始使用',
    'common.viewGithub': '查看源码',
    'common.learnMore': '了解更多',
    'common.contact': '联系我们',
    'common.trial': '免费试用',
    'common.appName': 'RT-FADS',

    // 导航
    'nav.dashboard': '仪表盘',
    'nav.model': '模型监控',
    'nav.system': '系统监控',
    'nav.rules': '规则配置',
    'nav.alerts': '告警管理',
    'nav.reports': '报表分析',
    'nav.user': '用户管理',
    'nav.settings': '系统设置',
    'nav.toggleSidebar': '切换侧边栏',
    'theme.toggle': '切换主题',

    // 主题
    'theme.light': '浅色模式',
    'theme.dark': '深色模式',

    // Landing Page
    'landing.nav.features': '功能特性',
    'landing.nav.architecture': '系统架构',
    'landing.nav.docs': '技术文档',
    'landing.nav.dashboard': '控制台',

    'landing.hero.title1': '实时欺诈',
    'landing.hero.highlight': '检测',
    'landing.hero.title2': '系统',
    'landing.hero.subtitle': '基于先进AI技术的隐私保护欺诈检测系统',

    'landing.stats.transactions': '处理交易量',
    'landing.stats.accuracy': '检测准确率',
    'landing.stats.response': '响应时间',
    'landing.stats.saved': '防损金',

    'landing.tech.title': '技术栈',
    'landing.tech.subtitle': '采用前沿技术构建',

    'landing.cta.title': '准备开始使用',
    'landing.cta.subtitle': '加入数千家使用我们系统保护交易安全的企业',
    'landing.cta.trial': '开始免费试用',
    'landing.cta.contact': '联系销售',

    'landing.footer.description': '基于MT-HGNN和隐私计算技术的先进实时欺诈检测系统',

    // Architecture
    'arch.title': '系统架构',
    'arch.subtitle': '现代化、可扩展、安全的架构设计',
    'arch.frontend': '前端层',
    'arch.backend': '后端服务',
    'arch.model': '模型层',
    'arch.data': '数据层',
    'arch.infra': '基础设施',

    // Model Encryption
    'model.encryption.title': '隐私保护模型训练',
    'model.encryption.subtitle': '基于同态加密的安全隐私模型训练流程',
    'model.encryption.step1': '发送加密训练数据',
    'model.encryption.step2': '处理加密特征',
    'model.encryption.step3': '安全模型计算',
    'model.encryption.step4': '返回加密梯度',
    'model.encryption.step5': '应用隐私保护',
    'model.encryption.step6': '添加结果噪声',
    'model.encryption.step7': '更新加密模型',
    'model.encryption.step8': '返回安全预测',
    'model.encryption.note1': '安全模型训练流程',
    'model.encryption.note2': '隐私保护训练完成',

    // Dashboard
    'dashboard.title': '系统概览',
    'dashboard.metrics': '关键指标',
    'dashboard.performance': '系统性能',
    'dashboard.successRate': '成功率',
    'dashboard.avgLatency': '平均延迟',
    'dashboard.processed': '已处理',
    'dashboard.fraudDetected': '欺诈检出',
    'dashboard.trainingHistory': '训练历史',
    'dashboard.predictionDist': '预测分布',

    // Reports Page
    'reports.title': '分析报表',
    'reports.filter.timeRange': '时间范围',
    'reports.filter.7days': '最近7天',
    'reports.filter.30days': '最近30天',
    'reports.filter.90days': '最近90天',
    'reports.export': '导出报表',
    
    'reports.metrics.totalTransactions': '总交易量',
    'reports.metrics.fraudRate': '欺诈率',
    'reports.metrics.avgResponseTime': '平均响应时间',
    'reports.metrics.vsLastPeriod': '相比上期',
    
    'reports.charts.fraudTrend': '欺诈检测趋势',
    'reports.charts.fraudTx': '欺诈交易',
    'reports.charts.normalTx': '正常交易',

    'reports.details.title': '详细报告',
    'reports.details.monthlyRisk': '月度风险分析报告',
    'reports.details.monthlyRisk.desc': '详细分析本月欺诈案件和风险趋势',
    'reports.details.highRisk': '高风险商户报告',
    'reports.details.highRisk.desc': '识别和分析高风险商户行为',
    'reports.details.ruleEffect': '规则效果评估',
    'reports.details.ruleEffect.desc': '评估当前欺诈检测规则的效果',

    'reports.insights.title': '关键洞察',
    'reports.insights.riskLevel': '风险等级',
    'reports.insights.riskTrend': '风险趋势',
    'reports.insights.topMerchants': '高风险商户',
    'reports.insights.recommendations': '建议措施',

    // 告警管理页面
    'alerts.management.title': '告警管理',
    'alerts.management.overview': '告警概览',
    'alerts.management.dashboard': '告警仪表盘',
    
    'alerts.status.active': '活动告警',
    'alerts.status.pending': '待审核',
    'alerts.status.resolved': '已解决',
    'alerts.status.ignored': '已忽略',
    
    'alerts.priority.critical': '严重',
    'alerts.priority.high': '高',
    'alerts.priority.medium': '中',
    'alerts.priority.low': '低',
    
    'alerts.type.fraud': '欺诈告警',
    'alerts.type.system': '系统告警',
    'alerts.type.model': '模型告警',
    'alerts.type.rule': '规则告警',
    'alerts.type.security': '安全告警',
    
    'alerts.details.id': '告警ID',
    'alerts.details.time': '告警时间',
    'alerts.details.source': '告警来源',
    'alerts.details.type': '告警类型',
    'alerts.details.priority': '优先级',
    'alerts.details.status': '状态',
    'alerts.details.description': '描述',
    'alerts.details.assignee': '处理人',
    
    'alerts.actions.acknowledge': '确认',
    'alerts.actions.resolve': '解决',
    'alerts.actions.ignore': '忽略',
    'alerts.actions.escalate': '升级',
    'alerts.actions.assign': '分配',
    'alerts.actions.comment': '评论',
    
    'alerts.filters.timeRange': '时间范围',
    'alerts.filters.priority': '优先级',
    'alerts.filters.status': '状态',
    'alerts.filters.type': '告警类型',
    'alerts.filters.assignee': '处理人',
    
    'alerts.stats.total': '总告警数',
    'alerts.stats.critical': '严重告警',
    'alerts.stats.resolved': '今日已解决',
    'alerts.stats.pending': '待审核数',

    // 用户管理页面
    'user.management.title': '用户管理',
    'user.management.overview': '用户概览',
    'user.management.roles': '角色管理',
    
    'user.list.active': '活动用户',
    'user.list.inactive': '非活动用户',
    'user.list.locked': '锁定用户',
    'user.list.pending': '待审批',
    
    'user.roles.admin': '管理员',
    'user.roles.manager': '经理',
    'user.roles.analyst': '分析师',
    'user.roles.operator': '操作员',
    'user.roles.viewer': '查看者',
    
    'user.details.username': '用户名',
    'user.details.email': '邮箱',
    'user.details.role': '角色',
    'user.details.department': '部门',
    'user.details.status': '状态',
    'user.details.lastLogin': '最后登录',
    'user.details.created': '创建时间',
    'user.details.modified': '最后修改',
    
    'user.actions.create': '创建用户',
    'user.actions.edit': '编辑用户',
    'user.actions.delete': '删除用户',
    'user.actions.activate': '激活用户',
    'user.actions.deactivate': '停用用户',
    'user.actions.resetPassword': '重置密码',
    'user.actions.assignRole': '分配角色',
    
    'user.permissions.view': '查看权限',
    'user.permissions.edit': '编辑权限',
    'user.permissions.delete': '删除权限',
    'user.permissions.manage': '管理权限',
    'user.permissions.admin': '管理员权限',

    // 系统设置页面
    'settings.title': '系统设置',
    'settings.general': '常规设置',
    'settings.security': '安全设置',
    'settings.notification': '通知设置',
    'settings.integration': '集成设置',
    'settings.backup': '备份与恢复',
    
    // 常规设置
    'settings.general.language': '语言',
    'settings.general.timezone': '时区',
    'settings.general.dateFormat': '日期格式',
    'settings.general.theme': '主题',
    'settings.general.currency': '货币',
    
    // 安全设置
    'settings.security.password': '密码策略',
    'settings.security.session': '会话设置',
    'settings.security.2fa': '双因素认证',
    'settings.security.audit': '安全审计日志',
    'settings.security.ip': 'IP白名单',
    
    'settings.security.password.length': '最小长度',
    'settings.security.password.complexity': '复杂度要求',
    'settings.security.password.expiry': '密码过期',
    'settings.security.password.history': '密码历史',
    
    'settings.security.session.timeout': '会话超时',
    'settings.security.session.concurrent': '并发会话',
    'settings.security.session.devices': '可信设备',
    
    // 通知设置
    'settings.notification.email': '邮件通知',
    'settings.notification.sms': '短信通知',
    'settings.notification.webhook': 'Webhook通知',
    'settings.notification.frequency': '告警频率',
    'settings.notification.digest': '每日摘要',
    
    // 集成设置
    'settings.integration.api': 'API配置',
    'settings.integration.webhook': 'Webhook配置',
    'settings.integration.sso': '单点���录',
    'settings.integration.ldap': 'LDAP集成',
    
    'settings.integration.api.key': 'API密钥',
    'settings.integration.api.secret': 'API密钥',
    'settings.integration.api.endpoint': 'API端点',
    'settings.integration.api.version': 'API版本',
    
    // 备份设置
    'settings.backup.auto': '自动备份',
    'settings.backup.schedule': '备份计划',
    'settings.backup.retention': '保留策略',
    'settings.backup.storage': '存储位置',
    'settings.backup.encrypt': '加密设置',
    
    // API测试页面
    'settings.integration.api.test': 'API测试',
    'settings.integration.api.testAll': '测试所有端点',
    'settings.integration.api.endpoints': 'API端点',
    'settings.integration.api.results': '测试结果',
    'settings.integration.api.success': '成功',
    'settings.integration.api.error': '错误',
    'settings.integration.api.responseTime': '响应时间',
    'settings.integration.api.lastTested': '最后测试时间',

    // API端点
    'api.endpoints.fraudDetection': '欺诈检测API',
    'api.endpoints.modelTraining': '模型训练API',
    'api.endpoints.userManagement': '用户管理API',
    'api.endpoints.alerts': '告警API',
    'api.endpoints.reports': '报表API',

    // 系统监控
    'system.monitor.title': '系统监控',
    'system.monitor.overview': '系统概览',
    'system.monitor.performance': '性能指标',
    'system.monitor.health': '系统健康',
    'system.monitor.resources': '资源使用',

    // 模型监控
    'model.monitor.title': '模型监控',
    'model.monitor.performance': '模型性能',
    'model.monitor.training': '训练状态',
    'model.monitor.predictions': '预测分析',
    'model.monitor.drift': '模型漂移',

    // 报表
    'reports.analytics.title': '报表与分析',
    'reports.analytics.overview': '概览',
    'reports.analytics.metrics': '关键指标',
    'reports.analytics.trends': '趋势分析',
    'reports.analytics.details': '详细报表',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 