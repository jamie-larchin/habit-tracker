import React from "react";
import styled from "styled-components";

import { AddNewHabit, Habit } from "..";
import { Styles } from "../../Services";

const Habits = ({ habits, setHabits }) => {
    const updateHabit = (id, newData) => {
        setHabits({
            ...habits,
            [id]: newData
        });
    };

    return (
        <Container>
            <Row>
                <h3>Habits</h3>
                <AddNewHabit habits={habits} setHabits={setHabits} />
            </Row>
            <List>
                {Object.values(habits).map(habit => {
                    const key = habit.name
                        .toLowerCase()
                        .split(" ")
                        .join("-");

                    return (
                        <Item key={key}>
                            <Habit {...habit} update={updateHabit} />
                        </Item>
                    );
                })}
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
    flex-wrap: wrap;
    margin: 0 -0.5rem;
`;

const Item = styled.li`
    margin: 0.375rem 0.5rem;
    display: flex;
`;

export default Habits;
