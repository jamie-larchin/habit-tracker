import React from "react";
import styled, { css } from "styled-components";

import { Styles } from "../../Services";
import theme from "../../theme";

const darkTheme = {
    fg: theme.colours.light,
    bg: theme.colours.dark
};

const lightTheme = {
    fg: theme.colours.dark,
    bg: theme.colours.light
};

const Button = ({ useTheme, useMode, children }) => {
    return (
        <StyledButton
            theme={useTheme === "dark" ? darkTheme : lightTheme}
            mode={useMode}
        >
            {children}
        </StyledButton>
    );
};

const primaryMode = css`
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.fg};
`;

const secondaryMode = css`
    border: 0.125rem solid ${props => props.theme.bg};
    color: ${props => props.theme.bg};
`;

const StyledButton = styled.button`
    ${Styles.resetButton};
    ${props => (props.mode === "primary" ? primaryMode : secondaryMode)};
    font-size: ${theme.fontSizes.regular};
    font-weight: 500;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 0.125rem;
    box-sizing: border-box;

    &:hover,
    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px rgba(25, 186, 255, 1),
            0 0 0 3px rgba(25, 186, 255, 0.5);
    }
`;

export default Button;
