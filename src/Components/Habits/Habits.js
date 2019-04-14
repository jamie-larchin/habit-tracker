import React from "react";
import styled from "styled-components";

import { Styles } from "../../Services";
import { FormState } from "../../Hocs";
import { Button, ColourInput, Modal, TextInput } from "..";

const Habits = ({ values, errors, handleChange, handleBlur }) => {
    return (
        <Container>
            <Row>
                <h3>Habits</h3>
                <Modal title="Add a new habit" triggerText="Add habit">
                    <h4 style={{ marginBottom: "1rem" }}>Form a new habit</h4>
                    <form>
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
                </Modal>
            </Row>
            <List>
                <Item>Eat well</Item>
                <Item>Physical activity</Item>
                <Item>No alcohol</Item>
                <Item>Do a hobby</Item>
            </List>
        </Container>
    );
};

const Container = styled.section`
    margin-bottom: 3rem;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const List = styled.ul`
    ${Styles.resetUl};
    display: flex;
`;

const Item = styled.li`
    margin-right: 2rem;
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

export default FormState(Habits)({ fields });
