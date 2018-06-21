import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {showOverlay,hideDialog} from '../../actions/modal';
import '../css/dialog.css';

class Dialog extends Component{
	componentDidUpdate(prevProps, prevState) {
		const {show} = this.props
		if(show){
			this.refs.dialog.style.display = 'block';
			setTimeout(function() {
				this.refs.dialog.className = 'dialog-modal dialog-in'
			}.bind(this), 10);
		}else{
			this.refs.dialog.className = 'dialog-modal dialog-out'
			setTimeout(function() {
				this.refs.dialog.style.display = 'none';
			}.bind(this), 400);
		}
	}


	_ok(){
		if(this.props.show){
			const {hideDialog,showOverlay,params} = this.props;
			typeof  params.okCallback === 'function' && params.okCallback();
			hideDialog();
			showOverlay(false);
		}
	}

	_cancel(){
		if(this.props.show){
			const {hideDialog,showOverlay,params} = this.props;
			typeof  params.cancelCallback === 'function' && params.cancelCallback();
			hideDialog();
			showOverlay(false);
		}
	}

	render(){
		const {params} = this.props;
		var cancelBtn = params.cancel && (<span className="dialog-button" onClick={this._cancel.bind(this)}>{params.cancel}</span>);
		return(
			<div className="dialog-modal dialog-out" ref='dialog'>
				<div className="dialog-inner">
					<div className="dialog-title">{params.title}</div>
					<div className="dialog-text" dangerouslySetInnerHTML={{__html:params.text}}></div>
				</div>
				<div className="dialog-buttons">
					{cancelBtn}
					<span className="dialog-button" onClick={this._ok.bind(this)}>{params.ok}</span>
				</div>
			</div>
		)
	}
}


Dialog.propTypes = {
	params: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch){
	return {
		showOverlay: bindActionCreators(showOverlay,dispatch),
		hideDialog: bindActionCreators(hideDialog,dispatch)
	}
}


export default connect(null,mapDispatchToProps)(Dialog);




