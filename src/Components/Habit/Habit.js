import React, { Component, Fragment } from "react";
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
                handleErrors
            } = this.props;

            handleUpdateState({ isLoading: true });

            Api.habits
                .put(id, values)
                .then(() => {
                    handleResetForm();
                    callback();
                })
                .catch(err => handleErrors(err));
        });
    };

    renderTrigger = (triggerRef, handleToggleModal) => {
        const { name, colour } = this.props;
        return (
            <Trigger onClick={handleToggleModal} ref={triggerRef}>
                <Colour value={colour} />
                {name}
                <Icon icon="Pen" />
            </Trigger>
        );
    };

    renderContent = handleToggleModal => {
        const { values, errors, handleChange, handleBlur } = this.props;
        return (
            <Fragment>
                <h4 style={{ marginBottom: "1rem" }}>Form a new habit</h4>
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
            </Fragment>
        );
    };

    render() {
        const { name } = this.props;
        return (
            <Modal
                title={`Edit &ldquo;${name}&rdquo;`}
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
    padding: 0.25rem 0.5rem;
    border-radius: 0.125rem;
    font-size: ${props => props.theme.fontSizes.regular};
    transition: box-shadow 0.3s ease;

    svg {
        opacity: 0;
        font-size: 0.875rem;
        margin-left: 0.375rem;
        transition: opacity 0.3s ease;
    }

    &:hover,
    &:focus {
        svg {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    }

    &:focus {
        outline: none;
        box-shadow: ${props =>
            `0 0 0 0.1875rem rgba(${props.theme.light.fgRgb}, 0.1)`};
        transition: box-shadow 0.3s ease;
    }
`;

const Colour = styled.span`
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background-color: ${props => props.value};
    margin-right: 0.5rem;
`;

const fields = [
    { name: "name", label: "Name", initialValue: "", validateType: "required" },
    {
        name: "colour",
        label: "Colour",
        initialValue: "",
        validateType: "required"
    }
];

export default FormState(Habit)({ fields });
