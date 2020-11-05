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
  { name: 'Wrap', url: '/components/wrapper' },
  { name: 'Form Select', url: '/components/form-select' },
  { name: 'Date Time', url: '/components/form-date-time' },
  { name: 'Form Select Timezone', url: '/components/form-select-timezone' },
  { name: 'Date Month Year', url: '/components/form-date-month-year' },
  { name: 'Form Input File', url: '/components/form-input-file' },
  { name: 'Magic Button', url: '/components/magic-button' },
  { name: 'Type Writer', url: '/components/type-writer' },
];

export const TOOL_CHILDRENDS: MenuItem[] = [
  { name: 'Json to Js', url: '/tools/json-to-js' },
  { name: 'Epoch Converter', url: '/tools/epoch-converter' },
  { name: 'Flex Layout', url: '/tools/flex-layout-demos' },
  { name: 'Moment Format Document', url: '/tools/moment-format-doc' },
  { name: 'LSTV', url: '/tools/lasotuvi' }
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
    name: 'Galaxy',
    url: '/galaxy'
  },
  {
    name: 'Components',
    url: '/components'
  },
  {
    name: 'Tools',
    url: '/tools'
  },
  {
    name: 'Error',
    url: '/not-found'
  }
];
