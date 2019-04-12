import React from "react";
import styled from "styled-components";

import { Styles } from "../../Services";
import { Modal } from "..";

const Habits = () => {
    return (
        <Container>
            <Row>
                <h3>Habits</h3>
                <Modal title="Add a new habit" triggerText="Add habit">
                    Content goes here
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

export default Habits;
