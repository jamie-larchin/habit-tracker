import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AddNewHabit, Habit } from "..";
import { Api, Styles } from "../../Services";

const Habits = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Api.habits
            .getAll()
            .then(res => {
                setData(
                    res.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {})
                );
            })
            .catch(err => console.error(err));
    }, []);

    const updateHabit = (id, newData) => {
        setData({
            ...data,
            [id]: newData
        });
    };

    return (
        <Container>
            <Row>
                <h3>Habits</h3>
                <AddNewHabit />
            </Row>
            <List>
                {Object.values(data).map(habit => {
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
    width: calc(100% + 0.5rem);
`;

const Item = styled.li`
    margin-right: 1.5rem;
    display: flex;
`;

export default Habits;
