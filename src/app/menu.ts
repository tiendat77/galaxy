export interface MenuItem {
  name: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Home',
    url: '/dashboard'
  },
  {
    name: 'Galaxy',
    url: '/galaxy'
  },
  {
    name: 'Charts',
    url: '/chart',
    children: []
  },
  {
    name: 'Galaxy Components',
    url: '/components',
    children: []
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
  },
  {
    name: 'Error',
    url: '/not-found'
  }
];