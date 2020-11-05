export interface NavigationItem {
  name: string;
  url: string;
  icon?: string;
  description?: string;
  children?: NavigationItem[];
}
