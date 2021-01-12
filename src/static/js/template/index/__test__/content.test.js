import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.2';
import Content from '../components/Content';
import { initConfig, fullConfig } from './config/content';

Enzyme.configure({ adapter: new Adapter() });

describe('Content test', () => {
    test('快照', () => {
        const wrapper = mount(<Content {...initConfig} />);
        expect(wrapper.render()).toMatchSnapshot();
        wrapper.setProps(fullConfig);
        expect(wrapper.render()).toMatchSnapshot();
    });

    test('交互', () => {
    });

    test('生命周期', () => {
    });
});
