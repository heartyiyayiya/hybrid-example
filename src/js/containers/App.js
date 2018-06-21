import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Overlay from '../components/Dialog/Overlay';
import Dialog from '../components/Dialog/Dialog';
import Toast from '../components/Dialog/Toast';

/*import containers*/
import Home from './Home'; //首页
import BusLoading from '../components/BusLoading';

import { alert, confirm, showLoader, toast, hideDialog, showOverlay } from '../actions/modal';


import {
    setTitle,
    appInit,
    goBack,
} from '../actions/app';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1).split(1)
        }
    }

    componentWillMount() {

        window.location.href = '#/';

        const { hideDialog, showOverlay, appInit } = this.props;

        setTimeout(() => {
            //页面切换
            window.addEventListener('hashchange', () => {

                var route = window.location.hash.substr(1);
                
                setTitle(route);

                route = route ? route : '/Home';

                this.setState({ route: route.split('/')[1] });

                hideDialog();
                showOverlay(false);

            });


            //app回退
            window.onBackPress = () => {
                goBack(window.location.hash.substr(1));
            };

            appInit();

        }, 500);

    }

    render() {
        let Child;
        switch (this.state.route) {
            case 'Home':
                Child = Home;
                break;
            default:
                Child = BusLoading;
        }

        const { dialog, overlay, toast } = this.props.modal;
        return (
            <div className="main-view">
                {
                    Child ? (<Child {...this.props} />) : ' '
                }

                <Overlay {...overlay} />
                <Dialog {...dialog} />
                <Toast {...toast} />
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        modal: state.modal,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        alert: bindActionCreators(alert, dispatch),
        hideDialog: bindActionCreators(hideDialog, dispatch),
        showOverlay: bindActionCreators(showOverlay, dispatch),
        confirm: bindActionCreators(confirm, dispatch),
        toast: bindActionCreators(toast, dispatch),
        showLoader: bindActionCreators(showLoader, dispatch),
        appInit: bindActionCreators(appInit, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



