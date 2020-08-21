export interface TimeLocaleDefinition {
  /**
   * The date and time (%c) format specifier (e.g., "%a %b %e %X %Y").
   */
  dateTime: string;
  /**
   * The date (%x) format specifier (e.g., "%m/%d/%Y").
   */
  date: string;
  /**
   *  The time (%X) format specifier (e.g., "%H:%M:%S").
   */
  time: string;
  /**
   * The A.M. and P.M. equivalents (e.g., ["AM", "PM"]).
   */
  periods: [string, string];
  /**
   * The full names of the weekdays, starting with Sunday.
   */
  days: [string, string, string, string, string, string, string];
  /**
   * The abbreviated names of the weekdays, starting with Sunday.
   */
  shortDays: [string, string, string, string, string, string, string];
  /**
   * The full names of the months (starting with January).
   */
  months: [string, string, string, string, string, string, string, string, string, string, string, string];
  /**
   * the abbreviated names of the months (starting with January).
   */
  shortMonths: [string, string, string, string, string, string, string, string, string, string, string, string];
}

export const viDefaultLocale: TimeLocaleDefinition = {
  dateTime: '%a %b %e %X %Y',
  date: '%m/%d/%Y',
  time: '%H:%M:%S',
  periods: ['SS', 'CH'],
  days: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thú Bảy'],
  shortDays: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
  months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  shortMonths: ['Thg 1', ' Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12']
};

export const enDefaultLocale: TimeLocaleDefinition = {
  dateTime: '%a %b %e %X %Y',
  date: '%m/%d/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export const ruDefaultLocale: TimeLocaleDefinition = {
  dateTime: '%A, %e %B %Y г. %X',
  date: '%d.%m.%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  shortMonths: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

