import React from "react";
import { ThemeProvider } from "styled-components"; 

import { theme } from "../../theme";
import { Dashboard } from "../../Components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
 
export default App;
