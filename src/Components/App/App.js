import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme";
import { Routes } from "..";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    );
};

export default App;
