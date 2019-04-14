import React, { Component, Fragment } from "react";

import { Button, ColourInput, Modal, TextInput } from "..";
import { FormState } from "../../Hocs";
import { Api } from "../../Services";

class HabitsModal extends Component {
    handleSubmit = (event, callback) => {
        event.preventDefault();
        const { validateForm } = this.props;
        validateForm(
            ({
                values,
                isValid,
                handleUpdateState,
                handleResetForm,
                handleErrors
            }) => {
                if (!isValid) return;
                handleUpdateState({ isLoading: true });

                Api.habits
                    .post(values)
                    .then(() => {
                        handleResetForm();
                        callback();
                    })
                    .catch(err => handleErrors(err));
            }
        );
    };

    render() {
        const { values, errors, handleChange, handleBlur } = this.props;

        return (
            <Modal
                title="Add a new habit"
                triggerText="Add habit"
                render={handleToggleModal => (
                    <Fragment>
                        <h4 style={{ marginBottom: "1rem" }}>
                            Form a new habit
                        </h4>
                        <form
                            onSubmit={e =>
                                this.handleSubmit(e, handleToggleModal)
                            }
                        >
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
                )}
            />
        );
    }
}

const fields = [
    { name: "name", label: "Name", initialValue: "", validateType: "required" },
    {
        name: "colour",
        label: "Colour",
        initialValue: "",
        validateType: "required"
    }
];

export default FormState(HabitsModal)({ fields });
