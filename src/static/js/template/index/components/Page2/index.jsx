import React from 'react';
import { Switch, Route, Router, Link } from 'react-router-dom';
import { decideComponentUpdate } from 'utils/common/tools';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.params = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return decideComponentUpdate(nextProps, this.props, nextState, this.state);
    }

    render() {
        return (
            <div>
               this is page2
            </div>
        );
    }
}
Page2.propTypes = {
};
Page2.defaultProps = {
};
export default Page2;
