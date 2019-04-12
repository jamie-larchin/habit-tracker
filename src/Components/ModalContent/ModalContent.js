import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Icon } from "..";
import { Styles } from "../../Services";

const ModalContent = ({
    title,
    handleToggle,
    handleKeyDown,
    handleClickOutside,
    modalRef,
    closeButtonRef,
    content
}) => {
    return ReactDOM.createPortal(
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
                <Content>{content}</Content>
            </Container>
        </Cover>,
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
    top: 0.0625rem;
    right: 0.0625rem;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    color: ${props => props.theme.light.fg};

    &:hover {
        filter: contrast(2);
    }
    &:focus {
        outline: ${props => `0.0625rem solid ${props.theme.light.fg}`};
    }
`;

export default ModalContent;
