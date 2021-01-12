/*
 * Created by wangqun  At Thu May 23 2019 16:55:54
 */


export default {};

// rule是一个字符串
document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
const styleSheets = document.styleSheets[document.styleSheets.length - 1];

/**
 *
 * 向style标签动态添加样式
 * @param {*} selector
 * @param {*} cssText
 */
export const addStylesheetRules = (selector, cssText) => {
    if (styleSheets.insertRule) {
        styleSheets.insertRule(`${selector}{${cssText};}`, styleSheets.cssRules.length);
    } else if (styleSheets.addRule) { /* IE */
        styleSheets.addRule(selector, cssText, -1);
    }
};

export const css = (el, styles) => {
    Object.keys(styles).forEach(key => {
        el.style.setProperty(key, styles[key]);
    });
};
