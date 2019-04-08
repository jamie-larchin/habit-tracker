import React from "react";
import styled, { css } from "styled-components";

import { Styles } from "../../Services";

const Button = ({ useTheme, mode, size, children, ...rest }) => {
    return (
        <StyledButton useTheme={useTheme} mode={mode} size={size} {...rest}>
            {children}
        </StyledButton>
    );
};

const primaryMode = css`
    background-color: ${props => props.theme[props.useTheme].bg};
    color: ${props => props.theme[props.useTheme].fg};
`;

const secondaryMode = css`
    border: 0.125rem solid ${props => props.theme[props.useTheme].bg};
    color: ${props => props.theme[props.useTheme].bg};
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
    transition: box-shadow 0.3s ease;

    &:hover,
    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 1px rgba(${
                props.theme.colours.rgb.blue
            }, 1), 0 0 0 3px rgba(25, 186, 255, ${
                props.useTheme === "dark" ? 0.4 : 0.5
            })`};
        transition: box-shadow 0.3s ease;
    }
`;

export default Button;
