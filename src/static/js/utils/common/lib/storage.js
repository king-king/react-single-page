import { isObject, isArray } from './is';

// 读取localStorage，做了兼容性处理
export const getLocalStorage = function (key) {
    if (window.localStorage && window.localStorage.getItem) {
        return window.localStorage.getItem(key);
    }
    return null;
};

// 设置localStorage，做了兼容性处理
export const setLocalStorage = function (key, value) {
    if (window.localStorage && window.localStorage.setItem) {
        if (isObject(value) || isArray(value)) {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            window.localStorage.setItem(key, value);
        }
    }
};

export const localStorageWorker = function (key) {
    return {
        set: value => setLocalStorage(key, value),
        get: () => getLocalStorage(key)
    };
};

export const setSessionStorage = function (key, value) {
    if (window.sessionStorage && window.sessionStorage.setItem) {
        if (isObject(value)) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            window.sessionStorage.setItem(key, value);
        }
    }
};

export const getSessionStorage = function (key) {
    if (window.sessionStorage && window.sessionStorage.getItem) {
        return window.sessionStorage.getItem(key);
    }
    return null;
};

export const sessionStorageWorker = function (key) {
    return {
        set: value => setSessionStorage(key, value),
        get: () => getSessionStorage(key)
    };
};
