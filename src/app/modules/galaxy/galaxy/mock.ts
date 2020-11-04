import { Report, ReportParam } from './interface';

export const REPORTS: Report[] = [
  {
    apiDescription: 'api.leanwell.co/report',
    href: '',
    id: 'reportole',
    name: 'Report Ole',
    permission: '',
  },
  {
    apiDescription: 'api.leanwell.co/report',
    href: '',
    id: 'reportpayroll',
    name: 'Report Payroll',
    permission: '',
  },
  {
    apiDescription: 'api.leanwell.co/report',
    href: '',
    id: 'reportbullshit',
    name: 'Report Bullshit',
    permission: '',
  },
  {
    apiDescription: 'api.leanwell.co/report',
    href: '',
    id: 'reportproduct',
    name: 'Report Product',
    permission: '',
  },
];

export const PARAMS: ReportParam[] = [
  {
    id: 'day',
    name: 'DAY',
    value: undefined,
    defaultValue: undefined,
    type: 'day_in_month',
    dataType: 'number',
    require: false,
    source: []
  },
  {
    id: 'month',
    name: 'MONTH',
    value: 10,
    defaultValue: 10,
    type: 'month_in_year',
    dataType: 'number',
    require: true,
    source: []
  },
  {
    id: 'year',
    name: 'YEAR',
    value: 2020,
    defaultValue: 2020,
    type: 'year',
    dataType: 'number',
    require: true,
    source: []
  },
  {
    id: 'workgroup',
    name: 'WORKGROUP',
    value: undefined,
    defaultValue: undefined,
    type: 'select',
    dataType: 'string',
    require: true,
    source: [
      { id: 'github', name: 'Github' },
      { id: 'pepsi', name: 'Pepsi' },
      { id: 'cocacola', name: 'Cocacola' },
      { id: 'ibm', name: 'IBM' },
      { id: 'tiki', name: 'Tiki' },
      { id: 'shopee', name: 'Shopee' },
      { id: 'yame', name: 'YaMe' },
      { id: 'toyota', name: 'Toyota' },
      { id: 'honda', name: 'Honda' },
      { id: 'yamaha', name: 'Yamaha' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'apple', name: 'Apple' },
    ]
  },
  {
    id: 'definition',
    name: 'DEFINITION',
    value: [],
    defaultValue: [],
    type: 'multi_select',
    dataType: 'string',
    require: true,
    source: [
      { id: 'github', name: 'Github' },
      { id: 'pepsi', name: 'Pepsi' },
      { id: 'cocacola', name: 'Cocacola' },
      { id: 'ibm', name: 'IBM' },
      { id: 'tiki', name: 'Tiki' },
      { id: 'shopee', name: 'Shopee' },
      { id: 'yame', name: 'YaMe' },
      { id: 'toyota', name: 'Toyota' },
      { id: 'honda', name: 'Honda' },
      { id: 'yamaha', name: 'Yamaha' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'apple', name: 'Apple' },
    ]
  },
  {
    id: 'range_from',
    name: 'Start time',
    value: undefined,
    defaultValue: undefined,
    dataType: 'number',
    require: false,
    type: 'date',
  },
  {
    id: 'range_to',
    name: 'End time',
    value: undefined,
    defaultValue: undefined,
    dataType: 'number',
    require: false,
    type: 'date',
  },
];
