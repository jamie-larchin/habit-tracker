import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { Calendar, Habits } from "..";
import { Api } from "../../Services";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [date, setDate] = useState(moment());
    const [habitsByDate, setHabitsByDate] = useState({});

    const getHabits = () => {
        Api.habits
            .getAll()
            .then(res => {
                setHabits(
                    res.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {})
                );
            })
            .catch(err => console.error(err));
    };

    const getCalendarData = () => {
        const year = date.format("YYYY");
        const month = date.format("MM");
        Api.calendar
            .get(year, month)
            .then(res => {
                setHabitsByDate(res.data);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getHabits();
        getCalendarData();
    }, []);

    const habitsProps = { habits, setHabits };
    const calendarProps = { date, setDate, habitsByDate, setHabitsByDate };

    return (
        <Container>
            <Inner>
                <Habits {...habitsProps} />
                <Calendar {...calendarProps} />
            </Inner>
        </Container>
    );
};

const Container = styled.main`
    display: flex;
    justify-content: center;
    padding: 2.5rem 0;
`;

const Inner = styled.div`
    max-width: ${props => props.theme.widths.site};
    flex-grow: 1;
    margin: 0 2rem;
`;

export default Dashboard;
