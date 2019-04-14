import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";

import { Icon } from "..";
import { Styles } from "../../Services";

const ModalContent = ({
    title,
    handleToggle,
    handleKeyDown,
    handleClickOutside,
    modalRef,
    closeButtonRef,
    children
}) => {
    return ReactDOM.createPortal(
        <FocusTrap>
            <Cover
                role="dialog"
                aria-label={title}
                aria-modal="true"
                tabIndex="-1"
                onClick={e => handleClickOutside(e, handleToggle)}
                onKeyDown={e => handleKeyDown(e, handleToggle)}
            >
                <Container ref={modalRef}>
                    <CloseButton
                        aria-label="Close modal"
                        onClick={handleToggle}
                        ref={closeButtonRef}
                    >
                        <Icon icon="Times" />
                    </CloseButton>
                    <Content>{children}</Content>
                </Container>
            </Cover>
        </FocusTrap>,
        document.body
    );
};

const Cover = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.dark.bgRgb}, 0.25)`};
`;

const Container = styled.div`
    width: 100%;
    height: auto;
    max-width: 30rem;
    max-height: calc(100% - 2em);
    margin: 1rem;
    padding: 1.5em;
    background-color: ${props => props.theme.light.bg};
    border: ${props => `0.0625rem solid ${props.theme.greys.e}`};
    box-shadow: ${props =>
        `0.0625rem 0.0625rem 0.0625rem rgba(${props.theme.dark.bgRgb}, 0.1)`};
    overflow-y: auto;
    box-sizing: border-box;
    position: relative;
    -webkit-overflow-scrolling: touch;
`;

const Content = styled.div``;

const CloseButton = styled.button`
    ${Styles.resetButton};
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    color: ${props => props.theme.light.fg};
    border-radius: 0.125rem;
    transition: all 0.3s ease;

    &:hover {
        filter: contrast(2);
    }
    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 0.1875rem rgba(${props.theme.colours.rgb.blue}, 0.75)`};
        transition: all 0.3s ease;
    }
`;

export default ModalContent;
