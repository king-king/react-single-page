import asyncComponent from 'utils/common/asyncComponent';


export default {
    '/wq/page1': {
        RenderComponent: asyncComponent(() => import('../template/index/components/Page1'))
    },
    '/wq/page2': {
        RenderComponent: asyncComponent(() => import('../template/index/components/Page2'))
    }
};
