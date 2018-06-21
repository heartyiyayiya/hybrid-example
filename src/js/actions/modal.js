import assign from 'object-assign';
import {
	HIDE_DIALOG,
	SHOW_DIALOG,
	SHOW_LOADER,
	SHOW_OVERLAY,
	SHOW_TOAST
} from '../constants';


export function hideDialog(){
	return{
		type: HIDE_DIALOG
	}
}

/*
* 显示或隐藏蒙层
* @show {bool} true 显示 false隐藏
* @opacity {number} 蒙层透明度
* */
export function showOverlay(show = false ,opacity = 0){
	return{
		type: SHOW_OVERLAY,
		show,
		opacity
	}
}

/*
* 确认弹框
* @alert('hello wolrd')
* @alert('hello world','title')
* @alert('hello world','title',function(){})
* @alert({
* 	ok:'OK',
* 	text:'text',
* 	title:'title',
*	okCallback:function(){
*		console.log('click ok');
*   }
* }
*/
export function alert(text,title,callback){

	return (dispatch,getState) =>{

		if(getState().modal.dialog.show){
			return;
		}

		var data = {
			ok: '确定'
		};

		if(typeof text === 'object'){
			data = assign({},data,{
				text: text.text,
				title: text.title,
				okCallback: text.okCallback,
				ok: text.ok || data.ok
			});
		}else if(typeof text === 'string'){
			data.text = text;
			if(typeof title === 'string'){
				data.title = title;
				if(typeof callback === 'function') {
					data.okCallback = callback;
				}
			}else if(typeof title === 'function'){
				data.okCallback = title;
			}
		}

		dispatch({
			type: SHOW_DIALOG,
			params: data
		});
		dispatch(showOverlay(true,1));
	}
}

/*
 * 确认弹框
 * @confirm('hello world')
 * @confirm('hello world','title')
 * @confirm('hello world','title',function(){})
 * @confirm({
 * 		ok:'OK',
 * 		cancel:'cancel'
 * 		text:'text',
 * 		title:'title',
 *		okCallback:function(){
 *		console.log('click ok');
 *  },
 *  cancelCallback:function(){
 *      console.log('click cancel');
 *  }
 * }
 */
export function confirm(text,btn,title,okCallback,cancelCallback){
	return (dispatch,getState) =>{
		if(getState().modal.dialog.show){
			// return;
		}

		// var data = {
		// 	ok: '确定',
		// 	cancel:'取消'
		// };

		var data = btn;

		if(typeof text === 'object'){
			data = assign({},data,{
				text: text.text,
				title: text.title,
				okCallback: text.okCallback,
				cancelCallback: text.cancelCallback,
				ok: text.ok || data.ok,
				cancel: text.cancel || data.cancel
			});
		}else if(typeof text === 'string'){
			data.text = text;
			if(typeof title === 'string'){
				data.title = title;
				if(typeof okCallback === 'function') {
					data.okCallback = okCallback;
				}
			}else if(typeof title === 'function'){
				data.okCallback = title;
			}
		}

		dispatch({
			type: SHOW_DIALOG,
			params: data
		});
		dispatch(showOverlay(true,1));

	}
}

/*
* toast提示
* @text {string} 提示文案
* duration {number} 显示时间
* */
export function toast(text,time = 1500){

	return (dispatch,getState) =>{

		if(getState().modal.toast.show){
			return;
		}

		dispatch({
			type: SHOW_TOAST,
			text,
			show:true
		});

		dispatch(showOverlay(true,0));

		setTimeout(function () {
			dispatch({
				type: SHOW_TOAST,
				show: false
			});
			dispatch(showOverlay(false));
		},time)

	}
}

/*显示loading框*/
export function showLoader(show=false,size){
	return (dispatch,getState) =>{
		dispatch({
			type: SHOW_LOADER,
			show,
			size
		});
		if(getState().modal.overlay.show){
			dispatch(showOverlay(false));
		}else{
			dispatch(showOverlay(true,0));
		}
	}
}
