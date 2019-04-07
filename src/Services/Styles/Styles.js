import { css } from "styled-components";

import theme from "../../theme";

const resetButton = css`
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: ${theme.fonts.primary};
`;

const resetUl = css`
    list-style-type: none;
    padding: 0;
`;

const Styles = {
    resetButton,
    resetUl
};

export default Styles;
