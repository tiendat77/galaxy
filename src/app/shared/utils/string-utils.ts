export function unsigned(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}

export function serialize(obj: any, parent?: string): string {
  if (typeof obj !== 'object') {
    return '';
  }

  let stringify = '';

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      const next = parent ? parent + '.' + key : key;
      stringify += serialize(obj[key], next);

      const lastKey = Object.keys(obj)[Object.keys(obj).length - 1];
      if (key !== lastKey) {
        stringify += ',';
      }

    } else {
      stringify += (parent ? parent + '.' : '') + key  + ':' + obj[key];

      const lastKey = Object.keys(obj)[Object.keys(obj).length - 1];
      if (key !== lastKey) {
        stringify += ',';
      }
    }
  }

  return stringify;
}

export function isNull(value: any) {
  return value === undefined || value === null || value.length === 0;
}

export default { serialize, unsigned, isNull }