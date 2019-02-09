import React, { Component } from "react";
import styled from "styled-components";

import { Logo } from "../../Components";

class Header extends Component {
    login = () => {
        const { auth } = this.props;
        auth.login();
    }

    logout = () => {
        const { auth } = this.props;
        auth.logout();
    }

    render() {
        const { auth } = this.props;

        return (
            <Container>
                <Inner>
                    <Logo />
                    {auth.isAuthenticated()
                        ? <button onClick={this.logout}>Logout</button>
                        : <button onClick={this.login}>Login</button>
                    }
                </Inner>
            </Container>
        );
    }
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
