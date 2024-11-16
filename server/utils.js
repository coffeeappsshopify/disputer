export function jsonStringify(data) {
  return JSON.stringify(data, (key, value)=> {
    if(typeof value === 'bigint') {
      return value.toString()
    }
    return value;
  });
}
