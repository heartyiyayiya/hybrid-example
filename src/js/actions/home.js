import {
    HOME_INFO
} from '../constants';

import {
    requestServerTime
} from '../services/apiServ';

/**
 * 首页初始化
 * */
export function homeInit() {
    return (dispatch, getState) => {
        const { app, home } = getState();

        requestServerTime().then((res) => {
            dispatch({
                type: HOME_INFO,
                homeInfo: res,
                errorType: 0
            });
        }).catch((err) => {
            console.log(err)
        })


    }
}




