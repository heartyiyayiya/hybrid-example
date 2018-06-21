import React,{Component} from 'react';
import '../css/popupBox.css';

var timer1, timer2;

export default class PopupBox extends Component {

    componentDidUpdate(prevProps, prevState) {
        const {show} = this.props;
        if (show) {
            timer2 && clearTimeout(timer2);
            this.refs.popupBox ? this.refs.popupBox.style.display = 'block': null;
            timer1 = setTimeout(()=> {
                this.refs.popupBox ? this.refs.popupBox.className = 'popup-box in': null;
            },10);
        } else {
            timer1 && clearTimeout(timer1);
            this.refs.popupBox ? this.refs.popupBox.className = 'popup-box out' : null;
            timer2 = setTimeout(() => {
                this.refs.popupBox ? this.refs.popupBox.style.display = 'none': null;
            },100);
        }
    }

    render() {
        var {bottom} = this.props;

        return (
            <div className='popup-box in' style={{bottom:bottom||0,display:"block"}} ref='popupBox'>
                {this.props.children}
            </div>
        )

    }
}








