import React from 'react';
import PropTypes from 'prop-types';
import { fetchCategory, decideComponentUpdate } from 'utils/common/tools';

class App extends React.Component {
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
            <div>tempalte</div>
        );
    }
}
App.propTypes = {
};
App.defaultProps = {
};
export default App;
