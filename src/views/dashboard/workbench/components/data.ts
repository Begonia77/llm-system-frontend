interface GroupItem {
  title: string
  icon: string
  color: string
  desc: string
  date: string
  group: string
}

interface NavItem {
  title: string
  icon: string
  color: string
}

interface DynamicInfoItem {
  avatar: string
  name: string
  date: string
  desc: string
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '用户管理',
    icon: 'ant-design:user-outlined',
    color: '#bf0c2c',
  },
  {
    title: '客户管理',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '供应商管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '库存管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '报表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
]

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '用户',
    date: '刚刚',
    desc: '显示动态 <a>接后端</a> ？',
  },
]

export const groupItems: GroupItem[] = [
  {
    title: '思考中',
    icon: 'carbon:logo-github',
    color: '',
    desc: '还没想好放什么',
    group: '占着位',
    date: '2024-01-18',
  },
]
