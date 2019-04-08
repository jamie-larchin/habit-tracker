import React, { Component } from "react";
import styled from "styled-components";

import { Button, Logo } from "..";

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
                    {auth.isAuthenticated() && (
                        <Button
                            useTheme="light"
                            mode="secondary"
                            size="primary"
                            onClick={auth.logout}
                            type="button"
                        >
                            Logout
                        </Button>
                    )}
                    {!auth.isAuthenticated() && (
                        <Button
                            useTheme="light"
                            mode="secondary"
                            size="primary"
                            onClick={auth.login}
                            type="button"
                        >
                            Login
                        </Button>
                    )}
                </Inner>
            </Container>
        );
    }
}

const Container = styled.header`
    background-color: ${props => props.theme.dark.bg};
    color: ${props => props.theme.dark.fg};
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    max-width: ${props => props.theme.widths.site};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    margin: 0 2rem;
`;

export default Header;
