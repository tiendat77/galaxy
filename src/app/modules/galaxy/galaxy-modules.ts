export interface GalaxyMenuItem {
  link: string;
  name: string;
  icon?: string;
}

export const GALAXY_MODULES: GalaxyMenuItem[] = [
  { icon: '', link: 'dashboard', name: 'Dashboard' },
  { icon: '', link: 'ui/avatar', name: 'Avatar' },
  { icon: '', link: 'ui/button', name: 'Button' },
  { icon: '', link: 'ui/card', name: 'Card' },
  { icon: '', link: 'ui/form', name: 'Form' },
  { icon: '', link: 'ui/menu', name: 'Menu' },
  { icon: '', link: 'ui/radio-button', name: 'Radio Button' },
  { icon: '', link: 'ui/sidenav', name: 'Sidenav' },
  { icon: '', link: 'ui/spinner', name: 'Spinner' },
  { icon: '', link: 'ui/tabs', name: 'Tabs' },
  { icon: '', link: 'ui/terminal', name: 'Terminal' },
  { icon: '', link: 'ui/tooltip', name: 'Tooltip' }
];
