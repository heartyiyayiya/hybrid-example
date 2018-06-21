import React,{Component } from 'react';

class ErrorModal extends Component{

	render(){
		var errorModal = {},
		noResultError = {
            icon:'noResult',
            textHtml:'出错了，稍后再来吧~'
        },
        netWorkError = {
           icon:'noNetwork',
           textHtml:'网络不给力<br/>请连接网络后点击屏幕重试'
        };

		const {errorType, clickHandler} = this.props;

		// console.log("errorModal:" + errorType);

	    errorModal = noResultError;

	    switch (parseInt(errorType)){
	    	case 1: //网络错误
		    	errorModal = netWorkError;
		    	break;
	    }

		return(
				<div className="errorModal"  onClick={()=>{
					if (errorType == 1 && clickHandler && typeof(clickHandler) === 'function') {
						clickHandler();
					};
				}}>
                    <div>   
	                    <i className={"icon-err-" + errorModal.icon}></i>                   
                        <div className="error-text">
	                        <p dangerouslySetInnerHTML={{__html: errorModal.textHtml}}></p>
                        </div>             
                    </div>                  
                </div>
		)
	}
}

export default ErrorModal;








