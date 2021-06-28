export interface GalaxyUI {
  id: string;
  name: string;
  demo: string;
  html: string;
  sass?: string;
  ts?: string;
}

export const GALAXY_UI: GalaxyUI[] = [
  {
    id: 'avatar',
    name: 'Avatar',
    demo: `
      <galaxy-avatar [source]="'https://cdn.dribbble.com/users/724973/screenshots/6417933/bullshit-dribbble.png'"></galaxy-avatar>
    `,
    html: `
      <galaxy-avatar>
      </galaxy-avatar>
    `,
  },
  {
    id: 'form',
    name: 'Form',
    demo: '',
    html: '',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    demo: '',
    html: '',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    demo: '',
    html: '',
  }
];
