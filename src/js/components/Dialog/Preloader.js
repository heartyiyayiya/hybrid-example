/**
 * Created by wangqian on 16/1/15.
 */
import React, { Component, PropTypes } from 'react';
import '../css/preloader.css';


export default class Preloader extends Component {

	componentDidUpdate(prevProps, prevState) {

		const { show } = this.props;

		if (prevProps.show == show) {
			return;
		}

		if (show) {
			this.refs.preloader.style.display = 'block';
			setTimeout(function () {
				this.refs.preloader.className = 'preloader-indicator-modal preloader-in'
			}.bind(this), 10);
		} else {
			this.refs.preloader.className = 'preloader-indicator-modal preloader-out'
			setTimeout(function () {
				this.refs.preloader.style.display = 'none';
			}.bind(this), 400);
		}
	}


	render() {
		const { size } = this.props;
		return (
			<div className="preloader-indicator-modal preloader-out" ref='preloader'>
				<span className="preloader preloader-white" style={{ width: size, height: size }}></span>
			</div>
		)

	}
}


