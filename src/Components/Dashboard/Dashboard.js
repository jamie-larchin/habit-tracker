import React from "react";
import styled from "styled-components";

import { Calendar } from "..";

const Dashboard = () => {
    return (
        <Container>
            <Inner>
                <Calendar />
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
