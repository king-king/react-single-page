/*
 * Created by wangqun  At Wed Apr 24 2019 16:43:22
 */

import graceRadio from './graceRadio';
import highcharts from './highcharts';

// 过滤组件中随机属性，做快照用
export default wrapper => {
    const visit = (node, func) => {
        func(node);
        node && Array.isArray(node.children) && node.children.forEach(n => visit(n, func));
    };
    for (let i = 0; i < wrapper.length; i++) {
        const element = wrapper[i];
        visit(element, n => {
            // 过滤highcharts中的随机字符串
            highcharts(n);
            // 过滤graceRadio中的随机字符串
            graceRadio(n);
        });
    }
    return wrapper;
};
