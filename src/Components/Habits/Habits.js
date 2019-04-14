import React, { Component } from "react";
import styled from "styled-components";

import { AddNewHabit, Habit } from "..";
import { Api, Styles } from "../../Services";

class Habits extends Component {
    state = { data: [] };

    componentDidMount() {
        Api.habits
            .getAll()
            .then(({ data }) => {
                this.setState({ data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { data } = this.state;

        return (
            <Container>
                <Row>
                    <h3>Habits</h3>
                    <AddNewHabit />
                </Row>
                <List>
                    {data.map(habit => {
                        const key = habit.name
                            .toLowerCase()
                            .split(" ")
                            .join("-");

                        return (
                            <Item key={key}>
                                <Habit {...habit} />
                            </Item>
                        );
                    })}
                </List>
            </Container>
        );
    }
}

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
    width: calc(100% + 0.5rem);
    transform: translateX(-0.5rem);
`;

const Item = styled.li`
    margin-right: 1.5rem;
`;

export default Habits;
