import { GET_CLIENTINFO } from '../constants';

import getUrlParam from '../utils/getUrlParam';

import { store } from '../store/configureStore';

import {
    requestServerTime
} from '../services/apiServ';
import {
    setNaviTitle,
    getSystemInfo,
    closePage,
    openProject,
    trackPage,
    trackEvent,
    openUrl
} from '../services/nativeServ';

var dateHandler = require('../utils/dateHandler');
var localStore = require('../utils/store');
var SERVERDATE;

var isCBD; //判断是否是客户端
if (navigator.userAgent.indexOf("chebada") != -1) {
    isCBD = true;
}

export function setTitle(route) {

    var pn = route.split('/')[1] || 'Root',
        title = "home",
        pageName = "",
        rightMenu = {
            type: "menuConfig",     //{string} 菜单类型 menuConfig | shareConfig | customerServiceConfig
            menuConfig: {     //{object} 自定义右侧导航菜单配置     ***********只需传一个(必传)**********
                text: " ",     //{string} 菜单文本
                icon: "",     //{string} 菜单icon
                callback: "javascript:void(0)"   //{string} 右菜单点击js回调函数名
            }
        };

    switch (pn) {
        case 'Home':
            title = 'home';
            pageName = "hyzx_shouye";
            break;
    }


    setNaviTitle(title, rightMenu);

    trackPage(pageName);

}


export function goBack(pathname, params) {
    var pn = pathname.split('/')[1] || 'Root',
        eventId = "",
        eventParams = "";
    switch (pn) {
        case 'Home':
            eventId = "cbd_170";
            break;
    }

    eventParams = "fanhui";

    trackEvent(eventId, eventParams);

    if (pn == 'Root' || pn == 'Home') {
        var closeView = getUrlParam("closeView");  //1--关闭webView
        if (closeView == 1) {
            closePage();
        } else {
            openProject({ //打开我的
                "projectType": "0",
                "pageIndex": "3",
                "pageParams": {}
            });
        }

    } else {
        window.history.back();
    }

}


export function openWebPage(url, config = {}) {
    // console.log(config);
    if (config.isCanShare && config.isCanShare == "0") { //不可分享
        config = {};
    };
    openUrl(url, config);
}


export function setPageTrack(pageName) {
    // console.log(pageName);
    trackPage(pageName);
}


export function startTrack(eventId, eventParams) {
    // console.log(eventId + "  " + eventParams);
    trackEvent(eventId, eventParams);
}

export function getCurrentDate() {
    var currentTime;
    if (isExist()) {
        currentTime = new Date(new Date().getTime() + (SERVERDATE.server - SERVERDATE.local)); //服务器时间
    } else {
        currentTime = new Date(); //当前时间
    }
    return currentTime;
}

//获取本地之间与服务器时间差
export function getDiffTime() {
    if (isExist()) {
        return (SERVERDATE.server - SERVERDATE.local);
    } else {
        return 0;
    }
}

function isExist() {
    if (typeof SERVERDATE == "undefined" || !SERVERDATE.server) {
        return false;
    }
    return true;
}

export function getHashQuery(index = 0) {
    index += 2;
    if (!index) return '';
    return window.location.hash.substr(1).split('/')[index];
}


export function appInit() {
    return (dispatch) => {

        var queryParams = {
            pageIndex: getUrlParam("pageIndex")
        };

        //获取客户端信息
        getSystemInfo().then((response) => {
            dispatch({
                type: GET_CLIENTINFO,
                clientInfo: response.clientInfo || {}
            });

        }).finally(function () {
            switch (queryParams.pageIndex) {
                case "0": //首页
                    window.location.href = '#/Home';
                    break;
                default:
                    window.location.href = '#/Home';
            }

        });

    }
}

//手机号码中间*号显示
export function formatMobile(str) {
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
