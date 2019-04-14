import React from "react";
import styled from "styled-components";

import { Label } from "..";
import theme from "../../theme";

const ColourInput = ({
    label,
    name,
    value,
    handleChange,
    handleBlur,
    errors,
    required,
    ...rest
}) => {
    return (
        <Label required={required}>
            {label}
            <HiddenInput
                type="color"
                name={name}
                value={value || theme.greys.e}
                onChange={handleChange}
                onBlur={handleBlur}
                {...rest}
            />
            <Wrapper hasErrors={errors && errors.length}>
                <Colour value={value || theme.greys.e} />
                {value || "Choose a colour"}
            </Wrapper>
        </Label>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    margin: 0.25rem 0;
    height: 2.5rem;
    border-radius: 0.125rem;
    border: ${props => `0.0625rem solid ${props.theme.greys.e}`};
    transition: all 0.3s ease;
`;

const HiddenInput = styled.input`
    position: absolute;
    left: -1rem;
    opacity: 0;

    &:focus + div {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 0.1875rem rgba(${props.theme.colours.rgb.blue}, 0.75)`};
        transition: all 0.3s ease;
    }
`;

const Colour = styled.span`
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background-color: ${props => props.value};
    margin-right: 0.5rem;
`;

export default ColourInput;
