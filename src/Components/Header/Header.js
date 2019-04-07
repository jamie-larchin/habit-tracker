import React, { Component } from "react";
import styled from "styled-components";

import { Logo } from "..";

class Header extends Component {
    componentDidMount() {
        const { auth } = this.props;
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            auth.renewSession();
        }
    }

    render() {
        const { auth } = this.props;

        return (
            <Container>
                <Inner>
                    <Logo />
                    {auth.isAuthenticated() ? (
                        <button onClick={auth.logout} type="button">
                            Logout
                        </button>
                    ) : (
                        <button onClick={auth.login} type="button">
                            Login
                        </button>
                    )}
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
