import React, { Component } from "react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme";
import { Dashboard } from "..";

class App extends Component {
    componentDidMount() {
        const { auth } = this.props;
        if (localStorage.getItem("isLoggedIn") === "true") {
            auth.renewSession();
        }
    }

    render() {
        const { auth } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Dashboard auth={auth} />
            </ThemeProvider>
        );
    }
}

export default App;
