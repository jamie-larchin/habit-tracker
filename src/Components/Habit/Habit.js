import React, { Component } from "react";
import styled from "styled-components";

import { Button, ColourInput, Icon, Modal, TextInput } from "..";
import { FormState } from "../../Hocs";
import { Api, Styles } from "../../Services";

class Habit extends Component {
    handleSubmit = (event, callback) => {
        event.preventDefault();
        const { id, validateForm } = this.props;
        validateForm(() => {
            const {
                values,
                handleUpdateState,
                handleResetForm,
                handleErrors,
                update
            } = this.props;

            handleUpdateState({ isLoading: true });

            Api.habits
                .put(id, values)
                .then(({ data }) => {
                    handleResetForm();
                    update(id, data);
                    callback();
                })
                .catch(err => handleErrors(err));
        });
    };

    hexToRbg = hex => {
        const r = +`0x${hex[1]}${hex[2]}`;
        const g = +`0x${hex[3]}${hex[4]}`;
        const b = +`0x${hex[5]}${hex[6]}`;
        return { r, g, b };
    };

    getTheme = hex => {
        const { r, g, b } = this.hexToRbg(hex);
        const hsp = Math.sqrt(
            0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
        );
        return hsp <= 127.5 ? "dark" : "light";
    };

    renderTrigger = (triggerRef, handleToggleModal) => {
        const { name, colour } = this.props;
        return (
            <>
                <Trigger onClick={handleToggleModal} ref={triggerRef}>
                    {name}
                </Trigger>
                <Colour
                    hexValue={colour}
                    rgbValue={this.hexToRbg(colour)}
                    getTheme={this.getTheme(colour)}
                    aria-label={`Add ${name} to calendar`}
                >
                    <Icon icon="ArrowsAlt" />
                </Colour>
            </>
        );
    };

    renderContent = handleToggleModal => {
        const { values, errors, handleChange, handleBlur } = this.props;
        return (
            <form onSubmit={e => this.handleSubmit(e, handleToggleModal)}>
                <TextInput
                    label="Name"
                    name="name"
                    value={values.name}
                    handleChange={e => handleChange(e)}
                    handleBlur={e => handleBlur(e)}
                    errors={errors.name}
                    required
                />
                <ColourInput
                    label="Colour"
                    name="colour"
                    value={values.colour}
                    handleChange={e => handleChange(e)}
                    handleBlur={e => handleBlur(e)}
                    errors={errors.colour}
                    required
                />
                <Button type="submit">Save</Button>
            </form>
        );
    };

    render() {
        const { name } = this.props;
        return (
            <Modal
                title={`Edit “${name}”`}
                trigger={(triggerRef, handleToggleModal) =>
                    this.renderTrigger(triggerRef, handleToggleModal)
                }
                content={handleToggleModal =>
                    this.renderContent(handleToggleModal)
                }
            />
        );
    }
}

const Trigger = styled.button`
    ${Styles.resetButton};
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.regular};
    transition: text-decoration 0.3s ease;

    &:hover,
    &:focus {
        outline: none;
        text-decoration: underline;
        transition: text-decoration 0.3s ease;
    }
`;

const Colour = styled.button`
    ${Styles.resetButton};
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.875rem;
    border-radius: 50%;
    background-color: ${props => props.hexValue};
    color: ${props => props.theme[props.getTheme].fg};
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.3s ease;

    &:hover,
    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 3px rgba(${props.rgbValue.r},${props.rgbValue.g},${
                props.rgbValue.b
            },0.5)`};
        transition: box-shadow 0.3s ease;

        svg {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    }

    svg {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;

const fields = [
    {
        name: "name",
        label: "Name",
        initialValue: "",
        validateType: "required"
    },
    {
        name: "colour",
        label: "Colour",
        initialValue: "",
        validateType: "required"
    }
];

export default FormState(Habit)({ fields });
