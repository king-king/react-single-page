// 判断一个值是否是undefined
export const isUndefined = target => Object.prototype.toString.call(target) === '[object Undefined]';

// 判断一个值是否是数组
export const isArray = target => Object.prototype.toString.call(target) === '[object Array]';

// 判断一个值是否是对象
export const isObject = target => Object.prototype.toString.call(target) === '[object Object]';

// 判断一个值是否是字符串
export const isString = target => Object.prototype.toString.call(target) === '[object String]';

// 判断一个值是否是布尔类型数值
export const isBool = target => Object.prototype.toString.call(target) === '[object Boolean]';

// 判断一个值是否是数字类型数值
export const isNumber = target => Object.prototype.toString.call(target) === '[object Number]';

// 判断一个值是否是对象，如果是对象是否是一个空对象，前提是target已经确认是对象
export const isEmptyObject = function (target) {
    if (isObject(target)) {
        return Object.keys(target).length === 0;
    }
    return false;
};
