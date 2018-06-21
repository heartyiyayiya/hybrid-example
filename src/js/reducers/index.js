import { combineReducers } from 'redux';

import modal from './modal';
import home from './home';
import app from './app';

const rootReducer = combineReducers({
	modal,
	app,
	home,
});

export default rootReducer;
