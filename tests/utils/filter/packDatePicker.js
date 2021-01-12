/*
 * Created by wangqun  At Tue Apr 30 2019 12:48:3
 */

// 过滤时间控件内容

export default wrapper => {
    const visit = (node, func) => {
        func(node);
        node && Array.isArray(node.children) && node.children.forEach(n => visit(n, func));
    };
    for (let i = 0; i < wrapper.length; i++) {
        const element = wrapper[i];
        visit(element, n => {
            // 过滤时间控件
            if (n && n.attribs && n.attribs.class === 'input-calendar') {
                n.children = [];
            }
        });
    }
    return wrapper;
};
