import React from "react";
import styled from "styled-components";

import { Label } from "..";

const TextInput = ({
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
            <Input
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                hasErrors={errors && errors.length}
                {...rest}
            />
        </Label>
    );
};

const Input = styled.input`
    padding: 0 1rem;
    margin: 0.25rem 0;
    height: 2.5rem;
    border-radius: 0.125rem;
    border: ${props => `0.0625rem solid ${props.theme.greys.e}`};
    font-size: ${props => props.theme.fontSizes.regular};
    font-family: ${props => props.theme.fonts.primary};
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 0.1875rem rgba(${props.theme.colours.rgb.blue}, 0.75)`};
        transition: all 0.3s ease;
    }
`;

export default TextInput;
