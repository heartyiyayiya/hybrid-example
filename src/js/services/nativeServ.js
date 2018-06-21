import { Promise } from 'es6-promise';

import { httpPlugins, userInfoPlugins, naviPlugins, utilsPlugins, dateTimePlugins } from 'cbd-bridge';

import xhr from '../utils/xhr';

var isCBD; //判断是否是客户端
if (navigator.userAgent.indexOf("chebada") != -1) {
    isCBD = true;
}

/**
 * 获取客户端信息
 * @return {object}
 */
export function getSystemInfo() {
    if (isCBD) {
        return userInfoPlugins.getSystemInfo();
    } else {
        return new Promise(function (resolve) {
            resolve()
        });
    }
}

/**
 * 添加统计事件
 * @eventId {string} //事件id
 * @eventParams {string} //事件参数
 * */
export function trackEvent(eventId, eventParams) {
    utilsPlugins.startTrack(eventId, eventParams);
}

export function trackPage(pageName) {
    utilsPlugins.setPageTrack(pageName);
}

/**
 * 打开外链
 * @url {string} //url地址
 * @config 导航菜单配置参数
 * @retrun void
 * */
export function openUrl(url, config = {}) {
    naviPlugins.openWebPage({
        webPageUrl: url,  //{string} 页面地址 (必传)
        shareConfig: config
    });
}

/**
 * 打开项目
 * @params {object}{
 *      "projectType": "0",
 *      "pageIndex": "3",
 *      "pageParams": {}
 * }
 * */
export function openProject(params) {
    naviPlugins.openProject(params);
}


/**
 * 设置页面标题
 * @pathname {string} hash值 例如:#/Home
 */
export function setNaviTitle(title, rightMenuConfig) {
    naviPlugins.setNaviTitle({
        title,
        rightMenuConfig
    });
}

/**
 * 关闭web view
 * */
export function closePage() {
    naviPlugins.closePage();
}

/**
 * 关闭web view
 * */
export function copy(str) {
    str = str.trim();
    // console.log(str);
    utilsPlugins.copy(str);
}

/* 
选择日期
*/
export function pickDate(params){
    return dateTimePlugins.pickDate(params);
}

/**
 * 调用客户端请求
 * @params {object}
 * */
export function startRequest(params) {
    if (isCBD) {
        return new Promise(function (resolve, reject) {
            httpPlugins.startRequest({
                serviceURL: params.serviceURL,  //{string}请求接口地址(必传)
                serviceName: params.serviceName, //{string}接口服务名称(必传)
                withLoadingDialog: params.withLoadingDialog,
                cancelable: params.cancelable,
                loadingTitle: params.loadingTitle,
                bodyParams: params.bodyParams
            },"1").then(response => {
                var processData = processResponse(response);
                const {isSuccess,body} = processData;

                if (isSuccess) {
                    resolve(body);
                } else {
                    reject(processData);
                }

            })
        });

    } else {

        return new Promise((resolve, reject) => {

            var url = './assets/' + params.serviceName + ".json?v=" + Date.now();

            xhr(url, function (res) {
                var processData = processResponse({
                    errorType: 0,
                    response: res,
                    canceled: 0
                });
                const { isSuccess, body } = processData;
                if (isSuccess) {
                    resolve(body);
                } else {
                    reject(processData);
                }

            });

        });

    }


}

/**
 * 处理返回数据
 * @data {object}
 * @return {object} {
 *      isSuccess:true/false, //{bool}
 *      status: 1, //{number}
 *      msg: '返回正确', //{string},
 *      body:{} //{object}
 * }
 * */
function processResponse(data) {
    const { errorType, canceled, response } = data;
    // console.log(errorType);

    switch (parseInt(errorType)) {

        case 0: //success 请求成功

            if (response && response.header) {

                const { rspCode, rspDesc } = response.header;
                if (rspCode == 0) { //请求成功
                    if (!response.body) { //无返回数据
                        return {
                            isSuccess: false,
                            status: 2000,
                            msg: '哎呀~ 出错啦，稍后再试试吧',
                            header: {}
                        };
                    }
                    return {
                        isSuccess: true,
                        status: 0,
                        msg: 'success',
                        body: response.body,
                        header: {}
                    };
                } else {
                    return {
                        isSuccess: false,
                        status: rspCode,
                        msg: rspDesc,
                        header: {}
                    };
                }
            } else { //接口错误
                return {
                    isSuccess: false,
                    status: 1000,
                    msg: '哎呀~ 出错啦，稍后再试试吧',
                    header: {}
                };
            }

        case 1: //network_error 网络错误
            return {
                isSuccess: false,
                status: 1,
                msg: '哎呀~ 网络出错啦，检查一下网络吧',
                header: {}
            };

        case 2: //json_error json格式错误
            return {
                isSuccess: false,
                status: 2,
                msg: '哎呀~ 出错啦，稍后再试试吧',
                header: {}
            };

        case 4: //请求不到接口
            return {
                isSuccess: false,
                status: 4,
                msg: '哎呀~ 出错啦，稍后再试试吧',
                header: {}
            }

        case 3: //logic_error 业务逻辑错误
        default:
            var dataHeader = response.header ? response.header : {};
            // console.log(dataHeader);

            return {
                isSuccess: false,
                status: 3,
                msg: dataHeader.rspDesc || '哎呀~ 出错啦，稍后再试试吧',
                header: dataHeader
            };


    }


}


