import React from "react";
import styled, { css } from "styled-components";

import { Styles } from "../../Services";

const Button = ({
    useTheme = "dark",
    mode = "primary",
    size = "primary",
    type = "button",
    forwardRef,
    children,
    ...rest
}) => {
    return (
        <StyledButton
            useTheme={useTheme}
            mode={mode}
            size={size}
            type={type}
            ref={forwardRef}
            {...rest}
        >
            {children}
        </StyledButton>
    );
};

const primaryMode = css`
    background-color: ${props => props.theme[props.useTheme].bg};
    color: ${props => props.theme[props.useTheme].fg};

    &:hover {
        filter: contrast(1.5);
        transition: all 0.3s ease;
    }
`;

const secondaryMode = css`
    border: 0.125rem solid ${props => props.theme[props.useTheme].bg};
    color: ${props => props.theme[props.useTheme].bg};

    &:hover {
        background: ${props =>
            `rgba(${props.theme[props.useTheme].bgRgb}, 0.1)`};
        transition: all 0.3s ease;
    }
`;

const primarySize = css`
    height: 2.5rem;
    padding: 0 1rem;
`;

const secondarySize = css`
    height: 2rem;
    padding: 0 0.75rem;
`;

const StyledButton = styled.button`
    ${Styles.resetButton};
    ${props => (props.mode === "primary" ? primaryMode : secondaryMode)};
    ${props => (props.size === "primary" ? primarySize : secondarySize)};
    font-size: ${props => props.theme.fontSizes.regular};
    font-weight: 500;
    border-radius: 0.125rem;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 3px rgba(${props.theme.colours.rgb.blue}, ${
                props.useTheme === "dark" ? 0.85 : 0.75
            })`};
        transition: all 0.3s ease;
    }
`;

export default Button;
