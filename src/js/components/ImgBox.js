import React,{Component } from 'react';

class ImgBox extends Component{

	constructor(props) {
		super(props);
		this.state = {
			imageUrl: this.props.imgInfo.imgDefault
		}
	}

	componentDidMount() {
		this.setState({
			imageUrl: this.props.imgInfo.imgSrc
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			imageUrl: nextProps.imgInfo.imgSrc
		})
	}

	_onError(){
		this.setState({
			imageUrl: this.props.imgInfo.imgDefault
		})
	}

	render(){

		return(
			<img onError={this._onError.bind(this)} src={this.state.imageUrl}  /> 
		)
	}
}

export default ImgBox;








