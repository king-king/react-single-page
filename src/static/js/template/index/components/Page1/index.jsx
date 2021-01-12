import React from 'react';
import { Switch, Route, Router, Link } from 'react-router-dom';
import { decideComponentUpdate } from 'utils/common/tools';

class Page1 extends React.Component {
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
                page1
            </div>
        );
    }
}
Page1.propTypes = {
};
Page1.defaultProps = {
};
export default Page1;
