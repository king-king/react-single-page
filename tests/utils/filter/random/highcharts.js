/*
 * Created by wangqun  At Wed Apr 24 2019 16:47:59
 */

// 过滤highcharts中的随机字符串
export default n => {
    if (n && n.attribs) {
        for (const key in n.attribs) {
            if ((key === 'id' || key === 'clip-path' || key === 'fill') && n.attribs[key].indexOf && n.attribs[key].indexOf('highcharts-') !== -1) {
                n.attribs[key] = '';
            }
        }
    }
};
