import React, { Component } from "react";

import { ModalContent } from "..";

class Modal extends Component {
    state = { isOpen: false };

    triggerButtonNode = React.createRef();

    modalNode = React.createRef();

    closeButtonNode = React.createRef();

    handleToggle = () => {
        this.setState(
            prevState => ({
                isOpen: !prevState.isOpen
            }),
            () => {
                const { isOpen } = this.state;
                if (isOpen) {
                    document.querySelector("html").style.overflowY = "hidden";
                    this.closeButtonNode.current.focus();
                } else {
                    document.querySelector("html").style = null;
                    this.triggerButtonNode.current.focus();
                }
            }
        );
    };

    handleKeyDown = (event, func) => {
        return event.keyCode === 27 && func();
    };

    handleClickOutside = (event, func) => {
        if (this.modalNode && this.modalNode.current.contains(event.target)) {
            return;
        }
        func();
    };

    render() {
        const { title, trigger, content } = this.props;
        const { isOpen } = this.state;

        return (
            <>
                {trigger(this.triggerButtonNode, this.handleToggle)}
                {isOpen && (
                    <ModalContent
                        title={title}
                        handleToggle={this.handleToggle}
                        handleKeyDown={this.handleKeyDown}
                        handleClickOutside={this.handleClickOutside}
                        modalRef={this.modalNode}
                        closeButtonRef={this.closeButtonNode}
                    >
                        {content(this.handleToggle)}
                    </ModalContent>
                )}
            </>
        );
    }
}

export default Modal;
