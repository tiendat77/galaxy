export interface Report {
  apiDescription: string;
  href: string;
  id: string;
  name: string;
  permission: string;
}

export interface ReportParam {
  dataType: string;
  id: string;
  name: string;
  value: any;
  defaultValue?: any;
  require: boolean;
  type: string;
  source?: any[];
}
