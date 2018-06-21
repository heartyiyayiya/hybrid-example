import assign from 'object-assign';
import {
	HIDE_DIALOG,
	SHOW_DIALOG,
	SHOW_LOADER,
	SHOW_OVERLAY,
	SHOW_TOAST
} from '../constants';



const initialState = {
	dialog: {
		show:false,
		params:{}
	},
	overlay: {
		show:false,
		opacity: 0
	},
	loader: {
		show: false,
		size: 25
	},
	toast:{
		show: false,
		text:''
	}
};


export default function modal(state = initialState, action){
	switch(action.type){
		case SHOW_DIALOG:
			return assign({},state,{
				dialog: {
					show:true,
					params: action.params
				}
			});
		case HIDE_DIALOG:
			return assign({},state,{
				dialog: {
					show: false,
					params: action.params || state.dialog.params
				}
			});
		case SHOW_LOADER:
			return assign({},state,{
				loader: {
					show: action.show,
					size: action.size || state.loader.size
				}
			});
		case SHOW_OVERLAY:
			return assign({},state,{
				overlay:{
					show: action.show,
					opacity: action.opacity
				}
			});
		case SHOW_TOAST:
			return assign({},state,{
				toast:{
					show: action.show,
					text: action.text || state.toast.text
				}
			});
	}
	return state;
}

