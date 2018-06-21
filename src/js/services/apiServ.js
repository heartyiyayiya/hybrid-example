import { startRequest } from './nativeServ';

const API_COMMOND_HANDLER = '/Public/Common/CommonHandler.ashx';


/*  HOME START*/

/**
 * 请求服务器时间
 * @requestData {object} //请求参数
 * */
export function requestServerTime(requestData) {
    return startRequest({
        serviceURL: API_COMMOND_HANDLER,
        serviceName: 'getservertime',
        withLoadingDialog: '0',
        cancelable: '0',
        //loadingTitle: '奋力加载中',
        bodyParams: requestData
    });
}

