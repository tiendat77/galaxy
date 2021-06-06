export interface GalaxyMenuItem {
  link: string;
  name: string;
  icon?: string;
};

export const GALAXY_MODULES: GalaxyMenuItem[] = [
  { icon: '', link: 'dashboard', name: 'Dashboard'},
  { icon: '', link: 'avatar', name: 'Avatar' },
  { icon: '', link: 'form', name: 'Form' },
  { icon: '', link: 'spinner', name: 'Spinner' },
  { icon: '', link: 'terminal', name: 'Terminal' }
];
