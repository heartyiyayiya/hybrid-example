import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../css/modal.css';


class Modal extends Component {

    componentDidUpdate(prevProps, prevState) {
        const {show} = this.props
        if (show) {
            this.refs.modal.style.display = 'block';
            setTimeout(function () {
                this.refs.modal.className = 'modal modal-in'
            }.bind(this), 10);
        } else {
            this.refs.modal.className = 'modal modal-out';
            setTimeout(function () {
                this.refs.modal.style.display = 'none';
            }.bind(this), 400);
        }
    }


    render() {
        const {style} = this.props;
        return (
            <div className='modal modal-out' ref="modal" style={style}>
                {
                    this.props.children
                }
            </div>
        )
    }
}


Modal.propTypes = {
    show: PropTypes.bool
};


export default Modal



