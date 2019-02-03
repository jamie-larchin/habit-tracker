import React from "react";
import styled from "styled-components";

import icon from "./icon.svg";

const Logo = () => {
    return (
        <Container>
            <Img src={icon} alt="Habit Tracker icon" />
            <H1>Habit Tracker</H1>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
    width: 2.5rem;
    margin-right: 0.25rem;
`;

const H1 = styled.h1`
    text-transform: lowercase;
`;
 
export default Logo;
