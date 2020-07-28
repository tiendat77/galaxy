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
      { name: 'Bullet Chart', url: '/chart/bullet-chart' },
      { name: 'Dashed Line Chart', url: '/chart/dash-line-chart' },
      { name: 'Clock', url: '/chart/clock' },
      { name: 'Bar Chart', url: '/chart/bar-chart' },
      { name: 'Line Chart', url: '/chart/line-chart' },
      { name: 'Smooth Zoom', url: '/chart/smooth-zoom' },
      { name: 'Tooltip', url: '/chart/tooltip' },
      { name: 'Line Bar Chart', url: '/chart/line-bar-chart' }
    ]
  },
  {
    name: 'Board',
    url: '/chart/board'
  }
];
