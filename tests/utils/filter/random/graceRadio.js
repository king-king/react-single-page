/*
 * Created by wangqun  At Wed Apr 24 2019 16:48:3
 */

// 过滤graceRadio中的随机字符串
export default n => {
    if (n && n.attribs) {
        if (n && n.name === 'input' && n.attribs && n.attribs['data-randomstr'] && n.attribs.type === 'radio') {
            if (n.attribs) {
                n.attribs['data-randomstr'] = ''; // 是随机字符串，过滤
                n.attribs.id = ''; // 是随机字符串，过滤
                n.attribs.name = ''; // 是随机字符串，过滤
            }
        }
        if (n && n.name === 'label' && n.attribs && n.attribs.for) {
            n.attribs.for = ''; // 是随机字符串，过滤
        }
    }
};
