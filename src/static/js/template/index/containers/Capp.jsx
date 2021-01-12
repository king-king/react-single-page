import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import { } from '../actions/action.js';

// 自动监听 state -> pros
const mapStateToProps = state => ({
});

// dispatch->props
const mapDispatchToProps = dispatch => ({
});

const Capp = connect(mapStateToProps, mapDispatchToProps)(App);

export default Capp;
