export const MOCK = [
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
    value: new Date().getMonth(),
    defaultValue: 10,
    type: 'month_in_year',
    dataType: 'number',
    require: true,
    source: []
  },
  {
    id: 'year',
    name: 'YEAR',
    value: new Date().getFullYear(),
    defaultValue: 2020,
    type: 'year',
    dataType: 'number',
    require: true,
    source: []
  }
];
