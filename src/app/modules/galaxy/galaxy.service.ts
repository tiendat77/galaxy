import { Injectable } from '@angular/core';
import { GALAXY_MODULES } from './galaxy-modules';

@Injectable()
export class GalaxyService {

  public moduleLink: string;
  public moduleName: string;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.moduleLink = 'dashboard';
    this.moduleName = 'Dashboard';
  }

  public setModule(link: string) {
    const module = GALAXY_MODULES.find(m => m.link === link);
    if (!module) { return; }

    this.moduleLink = module.link;
    this.moduleName = module.name;
  }

}
