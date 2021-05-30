import { NavigationItem } from '../interfaces/navigation-item';

export const AUTHOR_CONTACTS: NavigationItem[] = [
  { name: '+84 123456789', url: 'tel:+84344747434', icon: 'tel' },
  { name: 'huynhztienzdat@gmail.com', url: 'mailto:huynhztienzdat@gmail.com', icon: 'email' },
  { name: 'Số 37, Tân Lập, Đông Hòa, Dĩ An, Bình Dương', url: 'https://www.google.com/maps/@10.8751807,106.8084461,19.33z?hl=vi-VN', icon: 'address' },
];

export const GALAXY_PAGES: NavigationItem[] = [
  { name: 'Galaxy', url: '/'},
  { name: 'About', url: '/about'},
  { name: 'Dashboard', url: '/galaxy' }
];
