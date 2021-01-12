import React from 'react';
import { } from './tools';

export default importComponent => {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }
        async componentWillMount() {
            const { default: component } = await importComponent();
            this.setState({
                component
            });
        }
        shouldComponentUpdate() {
            return true;
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
};
