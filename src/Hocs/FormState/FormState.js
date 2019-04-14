import React, { Component } from "react";

const FormState = WrappedComponent => ({ fields }) => {
    return class _FormState extends Component {
        state = {
            values: {},
            labels: {},
            touched: {},
            errors: {},
            validate: {},
            isValid: false,
            isDirty: false,
            isSubmitted: false,
            isSubmitSuccessful: null,
            isLoading: false
        };

        componentDidMount() {
            this.initialiseState();
        }

        initialiseState = () => {
            const validateFns = {
                required: this.validateRequired
            };
            this.setState({
                values: fields.reduce((acc, field) => {
                    acc[field.name] = field.initialValue;
                    return acc;
                }, {}),
                labels: fields.reduce((acc, field) => {
                    acc[field.name] = field.label;
                    return acc;
                }, {}),
                touched: fields.reduce((acc, field) => {
                    acc[field.name] = false;
                    return acc;
                }, {}),
                errors: fields.reduce((acc, field) => {
                    acc[field.name] = null;
                    return acc;
                }, {}),
                validate: fields.reduce((acc, field) => {
                    acc[field.name] = validateFns[field.validateType];
                    return acc;
                }, {})
            });
        };

        validateForm = callback => {
            this.setState(
                ({ values, labels, validate }) => ({
                    errors: Object.keys(values).reduce((acc, field) => {
                        const label = labels[field];
                        const value = values[field];
                        acc[field] = validate[field]
                            ? validate[field](label, value)
                            : null;
                        return acc;
                    }, {})
                }),
                () => {
                    this.updateIsValid(callback);
                }
            );
        };

        validateField = name => {
            this.setState(
                ({ values, labels, errors, validate }) => ({
                    errors: {
                        ...errors,
                        [name]: validate[name]
                            ? validate[name](labels[name], values[name])
                            : null
                    }
                }),
                () => this.updateIsValid()
            );
        };

        validateRequired = (name, value) => {
            return !value ? [`${name} is required`] : null;
        };

        updateIsValid = callback => {
            this.setState(
                ({ errors }) => ({
                    isValid: !Object.values(errors).reduce((acc, error) => {
                        return error && error.length ? acc.concat(error) : acc;
                    }, []).length
                }),
                () => {
                    if (callback) {
                        callback();
                    }
                }
            );
        };

        handleUpdateState = state => {
            this.setState(state);
        };

        handleChange = event => {
            const { name, value, type, checked } = event.target;
            this.setState(
                ({ values }) => ({
                    values: {
                        ...values,
                        [name]: type === "checkbox" ? checked : value
                    },
                    isDirty: true
                }),
                () => {
                    this.validateField(name);
                }
            );
        };

        handleBlur = event => {
            const { name } = event.target;
            this.setState(({ touched }) => ({
                touched: {
                    ...touched,
                    [name]: true
                }
            }));
        };

        handleSubmit = (event, api, params) => {
            event.preventDefault();

            this.validateForm(() => {
                const { isValid } = this.state;
                if (!isValid) return;
                this.setState({ isLoading: true });

                api(params)
                    .then(() => {
                        this.handleResetForm();
                    })
                    .catch(err => {
                        console.error(err);
                        this.setState({
                            isSubmitted: true,
                            isSubmitSuccessful: false,
                            isLoading: false
                        });
                    });
            });
        };

        handleResetForm = () => {
            this.initialiseState();
            this.setState(
                {
                    isValid: false,
                    isDirty: false,
                    isSubmitted: true,
                    isSubmitSuccessful: true,
                    isLoading: false
                },
                () => {
                    setTimeout(() => {
                        this.setState({
                            isSubmitted: false,
                            isSubmitSuccessful: null
                        });
                    }, 8000);
                }
            );
        };

        render() {
            const { ...props } = this.props;
            const { ...state } = this.state;

            return (
                <WrappedComponent
                    handleChange={this.handleChange}
                    handleBlur={this.handleBlur}
                    handleSubmit={this.handleSubmit}
                    handleResetForm={this.handleResetForm}
                    handleUpdateState={this.handleUpdateState}
                    validateForm={this.validateForm}
                    {...props}
                    {...state}
                />
            );
        }
    };
};

export default FormState;
