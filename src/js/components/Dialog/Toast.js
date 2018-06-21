import React,{ Component } from 'react';
import '../css/toast.css';

class Toast extends Component{

	componentDidUpdate(prevProps, prevState) {

		const {show} = this.props
		if(show){
			this.refs.toast.style.display = 'block';
			setTimeout(function() {
				this.refs.toast.className = 'toast-wrap toast-in'
			}.bind(this), 10);
		}else{
			this.refs.toast.className = 'toast-wrap toast-out'
			setTimeout(function() {
				this.refs.toast.style.display = 'none';
			}.bind(this), 400);
		}
	}

    render(){
    	// console.log(2);
    	const {show,text} = this.props;
        return(
            <div className='toast-wrap toast-out' ref='toast' dangerouslySetInnerHTML={{__html:this.props.text}}>
            </div>
        )
    }
}

export default Toast;

