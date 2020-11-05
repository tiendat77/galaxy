import { NavigationItem } from './core/interfaces/navigation-item';

export const MENU_ITEMS: NavigationItem[] = [
  {
    name: 'Galaxy',
    url: '/galaxy'
  },
  {
    name: 'Charts',
    url: '/chart',
    children: [
      {
        name: 'Line',
        url: '/chart/line-chart',
        description: 'Line chart'
      },
      {
        name: 'Bar',
        url: '/chart/bar-chart',
        description: 'Bar chart'
      }
    ]
  },
  {
    name: 'Tools',
    url: '/tools',
    children: [
      {
        name: 'Json to Js',
        url: '/tools/json-to-js'
      },
      {
        name: 'Epoch Converter',
        url: '/tools/epoch-converter'
      },
      {
        name: 'Flex Layout',
        url: '/tools/flex-layout-demos'
      },
    ]
  }
];
