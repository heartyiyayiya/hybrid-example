import {GET_CLIENTINFO, SERVER_TIME} from '../constants';
import assign from 'object-assign';


var initialState = {
	osType:'',
	appVersion:'',
	deviceId: '',
	mobileNo:'',
	fullName:'',
	memberId:'',
	networkType: '',
	locationInfo:{},
	serverTime:{}
};


export default function app(state = initialState,action){

	switch(action.type){
		case GET_CLIENTINFO:
			return assign({},state,action.clientInfo);
		case SERVER_TIME:
			return assign({},state,{
				serverTime:action.serverTime
			});
		default:
			return state;
	}

}