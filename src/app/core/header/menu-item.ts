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
      { name: 'Clock', url: '/chart/clock' },
      { name: 'Bullet Chart', url: '/chart/bullet-chart' },
      { name: 'Bar Chart', url: '/chart/bar-chart' },
      { name: 'Line Chart', url: '/chart/line-chart' },
      { name: 'Smooth Zoom', url: '/chart/smooth-zoom' },
      { name: 'Tooltip', url: '/chart/tooltip' },
      { name: 'Line Bar Chart', url: '/chart/line-bar-chart' },
      { name: 'Random Zoom', url: '/chart/zoom' },
    ]
  }
];
