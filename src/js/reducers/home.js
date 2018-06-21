import {
	HOME_INFO,
} from '../constants';

import assign from 'object-assign';



const defaultState = {
	homeInfo: {},
	isFetched: false
}

export default function home(state = defaultState, action) {
	switch (action.type) {
		case HOME_INFO:
			return assign({}, state, {
				homeInfo: action.homeInfo,
				errorType: action.errorType,
				isFetched: true
			});
		default:
			return state;
	}
}