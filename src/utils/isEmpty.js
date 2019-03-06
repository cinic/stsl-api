module.exports = function (value) {
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  } else {
    console.log('Value must be an Object, string or Array, but u pass a ', typeof value);
    
    return false;
  }
}
