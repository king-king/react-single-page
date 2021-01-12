import { getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage, sessionStorageWorker, localStorageWorker } from './lib/storage';
import { isArray, isObject, isString, isBool, isEmptyObject, isUndefined, isNumber } from './lib/is';
import { copyArray, copyObject } from './lib/copy';

/*
    判断是否需要update一个组件，在react组件的shouldComponentUpdate中调用
    decideComponentUpdate(nextProps,this.props);
    decideComponentUpdate(nextState,this.state);
    decideComponentUpdate(nextProps,this.props,nextState,this.state);
    decideComponentUpdate(nextState,this.state,nextProps,this.props);
*/
function decideComponentUpdate(...arg) {
    if (arg.length % 2 === 1) {
        return true;
    }
    try {
        for (let i = 0; i < arg.length; i += 2) {
            if (JSON.stringify(arg[i]) !== JSON.stringify(arg[i + 1])) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return true;
    }
}

// 针对result是对象的情况，检查status是否为0，检查result是否存在以及是否是空对象。
// 只有当status为0、result存在并且不是空对象的时候返回true
function isResponseObjSuccess(res) {
    if (!res.data) {
        return false;
    } else if (Number(res.data.status) !== 0) {
        return false;
    } else if (isObject(res.data.result)) {
        return !isEmptyObject(res.data.result);
    }
    return false;
}

// 判断ajax返回的status是否正确
function isStatusSuccess(res) {
    return res.data && Number(res.data.status) === 0;
}

// 判断一个值是否有效（不为空字符串、不为null、不为undefined，不为_DATA_NO_AUTH_）
function isValueValid(value) {
    return value !== '' && value !== null && value !== undefined && value !== '_DATA_NO_AUTH_';
}

/*
    obj={
        key:{
            key1:value1,
            key2:value2,
            ...
        }
    }
    转化为
    arr=[
        {
            value:key,
            key1:value1,
            key2:value2,
            ...
        }
    ]
*/
function objectToArray(obj) {
    // 将对象转化为数组
    return Object.keys(obj).map(key => Object.assign({ value: key }, obj[key]));
}

// 高级版的filter，兼具filter和map的功能
function advanceFilter(array, func) {
    const result = [];
    if (!isArray(array)) {
        return null;
    }
    for (let i = 0; i < array.length; i++) {
        const re = func(array[i], i);
        if (re !== false) {
            result.push(re);
        }
    }
    return result;
}

export {
    decideComponentUpdate,
    isResponseObjSuccess,
    isStatusSuccess,
    isValueValid,
    isEmptyObject,
    isUndefined,
    isBool,
    isArray,
    isString,
    isNumber,
    isObject,
    advanceFilter,
    getLocalStorage,
    setLocalStorage,
    setSessionStorage,
    getSessionStorage,
    sessionStorageWorker,
    localStorageWorker,
    objectToArray,
    copyArray,
    copyObject
};

export { datePickConfiger, previousDay } from './lib/date';
