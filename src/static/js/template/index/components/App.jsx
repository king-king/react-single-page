import React from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route, Router, Link } from 'react-router-dom';
import { decideComponentUpdate } from 'utils/common/tools';
import routers from '../../../config/routers';
import Page1 from './Page1/index';

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
                <Router history={createBrowserHistory()}>
                    <Link to='/wq/page1'>Home</Link>
                    {/* <Switch>
                        {
                            Object.keys(routers).map(path => {
                                const RenderComponent = routers[path];
                                return (
                                    <Route key={path} path={path} render={props => <div>page1</div>} />
                                );
                            })
                        }
                    </Switch> */}
                    <Route path='/wq/page1'>
                        <Page1 />
                    </Route>
                </Router>
            </div>
        );
    }
}
App.propTypes = {
};
App.defaultProps = {
};
export default App;
