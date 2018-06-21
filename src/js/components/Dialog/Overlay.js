import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../css/overlay.css';

class Overlay extends Component{


	_click(){
		const {click} = this.props;
		click&&click();
	}

	render(){
		var className = classnames('modal-overlay',{
			"modal-overlay-visible":this.props.show
		});

		const {opacity,zIndex} = this.props;


		return(
			<div className={className} style={{opacity:opacity,zIndex:zIndex}} onClick={this._click.bind(this)}></div>
		)
	}
}

Overlay.propTypes = {
	show: PropTypes.bool.isRequired,
	opacity: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired
};


export default Overlay;



