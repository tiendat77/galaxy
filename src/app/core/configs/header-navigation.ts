import { NavigationItem } from '../interfaces/navigation-item';

export const GALAXY_HEADER_MENU: NavigationItem[] = [
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
        name: 'Flex Layout',
        url: '/tools/flex-layout'
      },
      {
        name: 'Box Shadow Collection',
        url: '/tools/box-shadow'
      },
      {
        name: 'Unix Timestamp Converter',
        url: '/tools/unix-converter'
      }
    ]
  }
];
