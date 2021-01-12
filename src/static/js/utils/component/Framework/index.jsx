import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { decideComponentUpdate } from 'utils/common/tools';

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
            <div>
                <ul>
                    <li>
                        <Link to='/page1'>page1</Link>
                    </li>
                    <li>
                        <Link to='/page2'>page2</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
App.propTypes = {
};
App.defaultProps = {
};
export default App;
