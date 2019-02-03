import React from "react";
import styled from "styled-components";

import { Logo } from "../../Components";

const Header = () => {
  return (
    <Container>
        <Inner>
            <Logo />
        </Inner>
    </Container>
  );
}

const Container = styled.header`
    background-color: ${props => props.theme.colours.dark};
    color: ${props => props.theme.colours.light};
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    max-width: ${props => props.theme.widths.site};
    flex-grow: 1;
    margin: 0 1rem;
`;
 
export default Header;
