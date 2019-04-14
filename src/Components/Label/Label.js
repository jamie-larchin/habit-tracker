import React from "react";
import styled from "styled-components";

const Label = ({ required, children }) => {
    return <StyledLabel required={required}>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

export default Label;
