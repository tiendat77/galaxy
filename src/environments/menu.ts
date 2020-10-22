export interface MenuItem {
  name: string;
  url: string;
  children?: MenuItem[];
}

const CHART_CHILDRENS: MenuItem[] = [
  { name: 'Board', url: '/chart/board' },
  { name: 'Line Chart', url: '/chart/line-chart' },
  { name: 'Horizontal Bar Chart', url: '/chart/horizontal-bar-chart' },
  { name: 'Line Bar Chart', url: '/chart/line-bar-chart' },
  { name: 'Stacked Bar Chart', url: '/chart/stacked-bar-chart' },
  { name: 'Pie Chart', url: '/chart/pie-chart' },
  { name: 'Clock', url: '/chart/clock' },
  { name: 'Bullet Chart', url: '/chart/bullet-chart' },
  { name: 'Tooltip', url: '/chart/tooltip' },
];

export const COMPONENT_CHILDRENDS: MenuItem[] = [
  { name: 'Magic Button', url: '/components/magic-button' },
  { name: 'Type Writer', url: '/components/type-writer' },
  { name: 'Form Select', url: '/components/form-select' },
  { name: 'Wrap', url: '/components/wrapper' }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Home',
    url: '/dashboard'
  },
  {
    name: 'Charts',
    url: '/chart',
    children: CHART_CHILDRENS
  },
  {
    name: 'Components',
    url: '/components'
  },
  {
    name: 'LaSoTuVi',
    url: '/lasotuvi'
  },
  {
    name: 'Error',
    url: '/not-found'
  }
];
