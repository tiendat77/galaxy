export interface MenuItem {
  name: string;
  url: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Home',
    url: '/dashboard'
  },
  {
    name: 'Charts',
    url: '/chart',
    children: [
      { name: 'Board', url: '/chart/board' },
      { name: 'Line Bar Chart', url: '/chart/line-bar-chart' },
      { name: 'Clock', url: '/chart/clock' },
      { name: 'Bullet Chart', url: '/chart/bullet-chart' },
      { name: 'Tooltip', url: '/chart/tooltip' },
    ]
  },
  {
    name: 'Effects',
    url: '/effect',
    children: [
      { name: 'Magic Button', url: '/effect/magic-button' },
      { name: 'Type Writer', url: '/effect/type-writer' }
    ]
  },
  {
    name: 'Error',
    url: '/not-found'
  }
];
