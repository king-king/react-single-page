import { css } from './style';

export default (tag, propertys, parent) => {
    const el = document.createElement('div');
    Object.keys(propertys).forEach(property => {
        switch (property) {
            case 'css':
                css(el, propertys[property]);
                break;
            case 'className':
                el.classList.add(propertys[property]);
                break;
            default:
                break;
        }
    });
    parent && parent.appendChild(el);
};
