import React from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { decideComponentUpdate } from 'utils/common/tools';
import routers from '../../../config/routers';

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
                <BrowserRouter history={createBrowserHistory()}>
                    <ul>
                        <li>
                            <Link to='/wq/page1'>page1</Link>
                        </li>
                        <li>
                            <Link to='/wq/page2'>page2</Link>
                        </li>
                    </ul>
                    <Switch>
                        {
                            Object.keys(routers).map(path => {
                                const RenderComponent = routers[path].RenderComponent;
                                return (
                                    <Route key={path} path={path} render={props => <RenderComponent {...props} />} />
                                );
                            })
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
App.propTypes = {
};
App.defaultProps = {
};
export default App;
