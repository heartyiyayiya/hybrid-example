import '../../css/home.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//组件
import ErrorModal from '../components/ErrorModal';
import BusLoading from '../components/BusLoading';
import ImgBox from '../components/ImgBox';

import { openWebPage, formatMobile, startTrack } from '../actions/app';

import {
    homeInit
} from '../actions/home';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        const { homeInit, app, home } = this.props;
        homeInit();
    }

    componentWillReceiveProps(nextProps) { }
    componentDidMount() { }
    componentDidUpdate() { }
    componentWillUnmount() { }

    render() {
        const { app, home, confirm, homeInit } = this.props;
        const { errorType, isFetched } = home;

        // console.log(app);

        if (!isFetched) {
            return (
                <BusLoading />
            );
        };

        if (isFetched && errorType != 0) {
            return (
                <ErrorModal errorType={errorType} clickHandler={() => homeInit()} />
            );
        };

        return (
            <div className="view">
                <div className="page-view home">
                    Home Page
                </div>
            </div>
        );


    }
}


function mapStateToProps(state) {
    return {
        home: state.home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        homeInit: bindActionCreators(homeInit, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);





